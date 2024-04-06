import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { Task } from "./Utils";
import TaskListItem from "./TaskListItem";
import TaskDetail from "./TaskDetail";

interface Props {
  isCommonGroup: boolean;
  title: string;
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (id: number) => void;
  onImportanceChange: (id: number) => void;
  onDeleteGroup: () => void;
  onUpdateGroup: (newName: string) => void;
}

const TaskList: React.FC<Props> = ({
  isCommonGroup,
  title,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onImportanceChange,
  onDeleteGroup,
  onUpdateGroup,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [groupName, setGroupName] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedIndex(-1);
    setSelectedTask(null);
  }, [tasks]);

  useEffect(() => {
    setGroupName(title);
  }, [title]);

  useEffect(() => {
    if (showTitleEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [showTitleEdit]);
  //
  // HANDLE TOGGLE COMPLETE
  const handleToggleComplete = (index: number, isComplete: boolean) => {
    const selectedTask = tasks[index];
    const updatedTask = { ...selectedTask, isComplete: isComplete };
    onTaskUpdate(updatedTask);
  };

  //
  // HANDLE TOGGLE IMPORTANT
  const handleToggleImportant = (index: number, isImportant: boolean) => {
    const selectedTask = tasks[index];
    const updatedTask = { ...selectedTask, isImportant: isImportant };
    onTaskUpdate(updatedTask);
    onImportanceChange(updatedTask.id);
  };

  //
  // HANDLE ON CLICK
  const handleOnClick = (index: number) => {
    const selectedTask = tasks[index];
    setSelectedIndex(index);
    setSelectedTask(selectedTask);
  };

  //
  // HANDLE TASK UPDATE
  const handleTaskUpdate = (updatedTask: Task) => {
    onTaskUpdate(updatedTask);
    setSelectedTask(null);
  };

  //
  // HANDLE TASK DELETE
  const handleTaskDelete = (id: number) => {
    onTaskDelete(id);
    setSelectedTask(null);
  };

  //
  // HANDLE GROUP CHANGE
  const handleGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setGroupName(newName);
    onUpdateGroup(newName);
  };

  //
  // HANDLE INPUT BLUR
  const handleInputBlur = () => {
    setShowTitleEdit(false);
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center m-3"
        style={{ height: "3em" }}
      >
        <div className={showTitleEdit ? "hide" : ""}>
          <div className="d-flex">
            <h2>{groupName}</h2>
            <button
              className={`btn ms-2 ${isCommonGroup ? "hide" : ""}`}
              onClick={() => setShowTitleEdit(true)}
            >
              <i className="bi bi-pencil fs-4"></i>
            </button>
          </div>
        </div>

        <div className={`w-100 ${showTitleEdit ? "" : "hide"}`}>
          <form className="d-flex">
            <input
              ref={inputRef}
              type="text"
              placeholder="Group Name"
              maxLength={25}
              className="form-control"
              value={groupName}
              onChange={handleGroupChange}
              onBlur={handleInputBlur}
            ></input>
          </form>
        </div>

        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Delete Group"
          className={`btn ${isCommonGroup ? "hide" : ""}`}
          onClick={onDeleteGroup}
        >
          <i className="bi bi-trash3 fs-4 text-danger"></i>
        </button>
      </div>

      <div className="d-flex w-100">
        <div id="task-group" style={{ flex: 2 }}>
          {tasks.map((task, index) => (
            <TaskListItem
              key={task.id}
              title={task.title}
              isComplete={task.isComplete}
              isImportant={task.isImportant}
              isActive={selectedIndex === index ? true : false}
              onToggleComplete={(isComplete: boolean) =>
                handleToggleComplete(index, isComplete)
              }
              onToggleImportant={(isImportant: boolean) =>
                handleToggleImportant(index, isImportant)
              }
              onClick={() => handleOnClick(index)}
            ></TaskListItem>
          ))}
        </div>

        <div
          className={selectedTask == null ? "hide" : "show"}
          style={{ flex: 1 }}
        >
          <TaskDetail
            task={selectedTask}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          ></TaskDetail>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

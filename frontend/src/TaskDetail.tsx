import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Task } from "./Utils";

interface Props {
  task: Task | null;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (id: number) => void;
}

interface State {
  title: string;
  note: string;
}

const TaskDetail: React.FC<Props> = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [state, setState] = useState<State>({
    title: "",
    note: "",
  });

  useEffect(() => {
    if (task) {
      setState({
        title: task.title || "",
        note: task.note || "",
      });
    }
  }, [task]);

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTitle = event.target.value;
    setState({ ...state, title: updatedTitle });
  };
  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = event.target.value;
    setState({ ...state, note: updatedNote });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task !== null) {
      const updatedTask = { ...task, title: state.title, note: state.note };
      onTaskUpdate(updatedTask);
    }
  };

  const handleDelete = () => {
    if (task !== null) {
      onTaskDelete(task.id);
    }
  };

  return (
    <div
      id="task-detail"
      className="d-flex flex-column justify-content-between mt-2"
    >
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Title"
          className="title-area"
          value={state.title}
          onChange={handleTitleChange}
        ></textarea>
        <textarea
          placeholder="Add note"
          className="note-area"
          value={state.note}
          onChange={handleNoteChange}
        ></textarea>
        <div className="w-100 d-flex mt-2">
          <button className="btn btn-dark" type="submit" id="submit">
            Update
          </button>
        </div>
      </form>

      <div className="w-100 d-flex">
        <button className="btn ms-auto" onClick={handleDelete}>
          <i className="bi bi-trash3 fs-4 text-danger"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;

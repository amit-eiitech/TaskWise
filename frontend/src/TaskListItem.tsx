import React, { useState } from "react";

interface Props {
  title: String;
  isComplete: boolean;
  isImportant: boolean;
  isActive: boolean;
  onToggleComplete: (isComplete: boolean) => void;
  onToggleImportant: (isImportant: boolean) => void;
  onClick: () => void;
}

interface State {
  isComplete: boolean;
  isImportant: boolean;
}

const TaskListItem: React.FC<Props> = ({
  title,
  isComplete,
  isImportant,
  isActive,
  onToggleComplete,
  onToggleImportant,
  onClick,
}) => {
  const [state, setState] = useState<State>({
    isComplete: isComplete,
    isImportant: isImportant,
  });

  const handleToggleComplete = () => {
    const currentIsComplete = !state.isComplete;
    setState({ ...state, isComplete: currentIsComplete });
    onToggleComplete(currentIsComplete);
  };

  const handleToggleImportant = () => {
    const currentIsImportant = !state.isImportant;
    setState({ ...state, isImportant: currentIsImportant });
    onToggleImportant(currentIsImportant);
  };

  return (
    <div
      id="task"
      className={`m-2 d-flex justify-content-between list-group-item ${
        isActive ? "active-task" : ""
      }`}
    >
      <div id="check-btn" className="p-3 fs-4" onClick={handleToggleComplete}>
        {state.isComplete ? (
          <i
            className="bi bi-check-circle-fill"
            style={{ color: "#6A82FB" }}
          ></i>
        ) : (
          <i className="bi bi-circle text-secondary"></i>
        )}
      </div>

      <div className="w-100 px-3 d-flex align-items-center" onClick={onClick}>
        {state.isComplete ? <del>{title}</del> : <span>{title}</span>}
      </div>

      <div id="imp-btn" className="p-3 fs-4" onClick={handleToggleImportant}>
        {state.isImportant ? (
          <i className="bi bi-star-fill" style={{ color: "gold" }}></i>
        ) : (
          <i className="bi bi-star" style={{ color: "darkgray" }}></i>
        )}
      </div>
    </div>
  );
};

export default TaskListItem;

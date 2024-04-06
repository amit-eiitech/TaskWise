import React, { useState, useEffect } from "react";
import { Task } from "./Utils";

interface Props {
  isActive: boolean;
  tasks: Task[];
  onAllTaskClick: () => void;
  onImpTaskClick: () => void;
}

interface State {
  allTaskCount: number;
  impTaskCount: number;
}

const CommonList: React.FC<Props> = ({
  isActive,
  tasks,
  onAllTaskClick,
  onImpTaskClick,
}) => {
  const [state, setState] = useState<State>({
    allTaskCount: 0,
    impTaskCount: 0,
  });

  const [allSelected, setAllSelected] = useState(true);
  const [impSelected, setImpSelected] = useState(false);

  useEffect(() => {
    if (tasks) {
      setState({
        allTaskCount: tasks.length,
        impTaskCount: tasks.filter((task) => task.isImportant).length,
      });
    }
  }, [tasks]);

  useEffect(() => {
    if (isActive === false) {
      setAllSelected(false);
      setImpSelected(false);
    }
  });

  const handleAllTaskClick = () => {
    onAllTaskClick();
    setAllSelected(true);
    setImpSelected(false);
  };
  const handleImpTaskClick = () => {
    onImpTaskClick();
    setAllSelected(false);
    setImpSelected(true);
  };

  return (
    <div className="common-group-list-wrapper">
      <div
        className={`group-list ${allSelected ? "active" : ""}`}
        onClick={handleAllTaskClick}
      >
        <i className="bi bi-list-task"></i>
        <span className="fw-medium">All Tasks</span>
        <span className="item-count ms-auto">{state.allTaskCount}</span>
      </div>

      <div
        className={`group-list ${impSelected ? "active" : ""}`}
        onClick={handleImpTaskClick}
      >
        <i className="bi bi-star-fill" style={{ color: "gold" }}></i>
        <span className="fw-medium">Important</span>
        <span className="item-count ms-auto">{state.impTaskCount}</span>
      </div>
    </div>
  );
};

export default CommonList;

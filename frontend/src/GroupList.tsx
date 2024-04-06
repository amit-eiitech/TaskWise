import React, { useEffect, useState } from "react";
import { Group, Task } from "./Utils";

interface Props {
  isActive: boolean;
  tasks: Task[];
  groups: Group[];
  onSelectionChange: (group: Group) => void;
}

const GroupList: React.FC<Props> = ({
  isActive,
  tasks,
  groups,
  onSelectionChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (isActive === false) {
      setSelectedIndex(-1);
    }
  }, [isActive]);

  const handleOnClick = (index: number) => {
    setSelectedIndex(index);
    onSelectionChange(groups[index]);
  };

  return (
    <div className="group-list-wrapper">
      {groups.map((group, index) => (
        <div
          key={group.id}
          className={`group-list ${selectedIndex === index ? "active" : ""}`}
          onClick={() => {
            handleOnClick(index);
          }}
        >
          <i className="bi bi-list"></i>
          <span className="fw-medium">{group.name}</span>
          <span className="item-count ms-auto">
            {tasks.filter((task) => task.taskGroup === group.id).length}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GroupList;

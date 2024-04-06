import React, { ChangeEvent, useState, FormEvent } from "react";

interface Props {
  onSubmit: (title: string) => void;
}

const CreateTaskBar: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== "") {
      onSubmit(title);
      setTitle(""); // Clearing the input field after submission
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div id="task-input">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter new task..."
          value={title}
          onChange={handleChange}
        />
        <button className="btn btn-dark ms-3" type="submit" id="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTaskBar;

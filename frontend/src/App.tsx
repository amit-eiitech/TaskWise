import { Component } from "react";
import "./App.css";
import { getCookie, Task, Group } from "./Utils";
import CreateTaskBar from "./CreateTaskBar";
import TaskList from "./TaskList";
import CommonList from "./CommonLists";
import GroupList from "./GroupList";

interface State {
  tasks: Task[];
  currentTasks: Task[];
  groups: Group[];
  selectedGroupName: string;
  selectedGroup: Group | null;
}

class App extends Component<{}, State> {
  state: State = {
    tasks: [],
    currentTasks: [],
    groups: [],
    selectedGroupName: "All Tasks",
    selectedGroup: null,
  };

  componentDidMount() {
    this.fetchTasks();
    this.fetchGroups();
  }

  //
  // BACK-END - TASKS:
  //
  // FETCH TASKS
  fetchTasks() {
    console.log(process.env.NODE_ENV);
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = "https://taskwise.azurewebsites.net/api/tasks/";
    } else {
      url = "http://127.0.0.1:8000/api/tasks/";
    }
    fetch(url)
      .then((response) => response.json())
      .then((data: Task[]) => {
        this.setState({ tasks: data }, () => this.updateCurrentTasks());
      });
  }

  //
  // CREATE TASK
  createTask = (title: string, taskGroup: number | null) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = "https://taskwise.azurewebsites.net/api/create-task/";
    } else {
      url = "http://127.0.0.1:8000/api/create-task/";
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ title: title, taskGroup: taskGroup }),
    }).then(() => {
      this.fetchTasks();
    });
  };

  //
  // DELETE TASK
  deleteTask = (id: number) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = `https://taskwise.azurewebsites.net/api/delete-task/${id}`;
    } else {
      url = `http://127.0.0.1:8000/api/delete-task/${id}`;
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: null,
    });
  };

  //
  // UPDATE TASK
  updateTask = (task: Task) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = `https://taskwise.azurewebsites.net/api/update-task/${task.id}/`;
    } else {
      url = `http://127.0.0.1:8000/api/update-task/${task.id}/`;
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(task),
    });
  };

  //
  // BACK-END - GROUPS:
  //
  // FETCH GROUPS
  fetchGroups() {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = "https://taskwise.azurewebsites.net/api/groups/";
    } else {
      url = "http://127.0.0.1:8000/api/groups/";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data: Group[]) => this.setState({ groups: data }));
  }

  //
  // CREATE GROUP
  createGroup = (name: string) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = "https://taskwise.azurewebsites.net/api/create-group/";
    } else {
      url = "http://127.0.0.1:8000/api/create-group/";
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ name: name }),
    }).then(() => {
      this.fetchGroups();
    });
  };

  //
  // DELETE GROUP
  deleteGroup = (id: number) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = `https://taskwise.azurewebsites.net/api/delete-group/${id}/`;
    } else {
      url = `http://127.0.0.1:8000/api/delete-group/${id}/`;
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: null,
    }).then(() => {
      this.fetchTasks();
    });
  };

  //
  // UPDATE GROUP
  updateGroup = (group: Group) => {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = `https://taskwise.azurewebsites.net/api/update-group/${group.id}/`;
    } else {
      url = `http://127.0.0.1:8000/api/update-group/${group.id}/`;
    }
    const csrftoken = getCookie("csrftoken") || "";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(group),
    });
    this.fetchTasks();
    this.fetchGroups();
  };

  //
  // FRONT-END:
  //
  // HANDLE CREATE TASK
  handleCreateTask = (title: string) => {
    console.log(this.state.selectedGroup?.id);
    this.createTask(title, this.state.selectedGroup?.id || null);
  };

  // HANDLE DELETE TASK
  handleTaskDelete = (id: number) => {
    // Delete the task in back-end
    this.deleteTask(id);

    // Create a new tasks array except the deleted task
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    // Update the tasks array
    this.setState({ tasks: updatedTasks });

    // Create a new current tasks array except the deleted task
    const updatedCurrentTasks = this.state.currentTasks.filter(
      (task) => task.id !== id
    );

    // Update the current tasks array
    this.setState({ currentTasks: updatedCurrentTasks });
  };

  // HANDLE UPDATE TASK
  handleTaskUpdate = (updatedTask: Task) => {
    // Update the task in back-end
    this.updateTask(updatedTask);

    // Create a new tasks array and replace the updated task
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    // Update the tasks array
    this.setState({ tasks: updatedTasks });

    // Create a new current tasks array and replace the updated task
    const updatedCurrentTasks = this.state.currentTasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    // Update the tasks array
    this.setState({ currentTasks: updatedCurrentTasks });
  };

  // HANDLE TASK IMPORTANCE CHANGE
  handleTaskImportanceChange = (id: number) => {
    if (this.state.selectedGroupName === "Important") {
      const updatedTasks = this.state.currentTasks.filter(
        (task) => task.id !== id
      );
      this.setState({ currentTasks: updatedTasks });
    }
  };

  // TASK LIST CHANGE ACTIONS:
  // UPDATE CURRENT TASKS
  updateCurrentTasks() {
    const { tasks, selectedGroupName, selectedGroup } = this.state;
    if (selectedGroup !== null) {
      this.setState({
        currentTasks: tasks.filter(
          (task) => task.taskGroup == selectedGroup.id
        ),
      });
    } else {
      if (selectedGroupName == "Important") {
        this.setState({
          currentTasks: tasks.filter((task) => task.isImportant),
        });
      } else {
        this.setState({
          currentTasks: tasks,
        });
      }
    }
  }

  // HANDLE ALL TASK CLICK
  handleAllTaskClick = () => {
    this.setState({
      selectedGroup: null,
      selectedGroupName: "All Tasks",
      currentTasks: this.state.tasks,
    });
  };

  // HANDLE IMPORTANT TASK CLICK
  handleImpTaskClick = () => {
    this.setState({
      selectedGroup: null,
      selectedGroupName: "Important",
      currentTasks: this.state.tasks.filter((task) => task.isImportant),
    });
  };

  //
  handleGroupChange = (group: Group) => {
    this.setState({
      selectedGroup: group,
      selectedGroupName: group.name,
      currentTasks: this.state.tasks.filter(
        (task) => task.taskGroup === group.id
      ),
    });
  };

  //
  // HANDLE CREATE GROUP
  handleCreateTaskList = () => {
    this.createGroup("New List");
  };

  //
  //HANDLE DELETE GROUP
  handleDeleteGroup = () => {
    if (this.state.selectedGroup !== null) {
      const selectedGroupID = this.state.selectedGroup.id;
      const updatedGroups = this.state.groups.filter(
        (group) => group.id !== selectedGroupID
      );

      this.setState({ groups: updatedGroups });
      this.deleteGroup(selectedGroupID);
      this.handleAllTaskClick();
    }
  };

  //
  handleUpdateGroup = (newName: string) => {
    if (this.state.selectedGroup !== null) {
      const updatedGroup: Group = {
        ...this.state.selectedGroup,
        name: newName,
      };
      this.updateGroup(updatedGroup);
    }
  };

  render() {
    const { tasks, currentTasks, groups, selectedGroupName, selectedGroup } =
      this.state;

    return (
      <div className="d-flex">
        {/* LEFT PANEL */}
        <div id="left-panel" className="d-flex flex-column">
          <div
            className="text-center"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <h2>TaskWise</h2>
          </div>

          <CommonList
            isActive={selectedGroup == null}
            tasks={tasks}
            onAllTaskClick={this.handleAllTaskClick}
            onImpTaskClick={this.handleImpTaskClick}
          ></CommonList>

          <GroupList
            isActive={selectedGroup !== null}
            tasks={tasks}
            groups={groups}
            onSelectionChange={this.handleGroupChange}
          ></GroupList>

          <div className="mt-auto d-flex justify-content-center">
            <button
              onClick={this.handleCreateTaskList}
              className="btn btn-dark"
            >
              Add new List
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div id="right-panel" className="w-100 d-flex">
          <div id="list-panel">
            <TaskList
              isCommonGroup={selectedGroup == null}
              title={selectedGroupName}
              tasks={currentTasks}
              onTaskUpdate={this.handleTaskUpdate}
              onTaskDelete={this.handleTaskDelete}
              onImportanceChange={this.handleTaskImportanceChange}
              onDeleteGroup={this.handleDeleteGroup}
              onUpdateGroup={this.handleUpdateGroup}
            ></TaskList>

            {/* TASK INPUT */}
            <CreateTaskBar onSubmit={this.handleCreateTask}></CreateTaskBar>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Home.css";
import Navbar from "../components/Navbar";
import getGreeting from "../utils/getGreeting";
import {
  closeAddModal,
  createNewTask,
  fetchTasks,
  openAddModal,
} from "../store/todo/todoSlice";
import TaskComponent from "../components/TaskComponent";
import { toast } from "react-toastify";

import { Bars } from "react-loader-spinner";
function convertDatesToISO(date) {
  let isoDate = new Date(date);
  return isoDate.toISOString();
}
const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <input
        type="radio"
        checked={checked == value}
        onChange={() => setter(value)}
      />
      <span>{label}</span>
    </label>
  );
};

const AddTaskModal = (props) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 0,
    dueDate: "",
  });
  const { isLoading, showAddModal } = useSelector((state) => state.todo);
  const { authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const task = props.task;
  const [priority, setPriority] = React.useState();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, priority: priority });
    setNewTask({ ...newTask, dueDate: convertDatesToISO(newTask.dueDate) });
    dispatch(createNewTask({ authToken, newTask }));
    dispatch(closeAddModal());
    toast.success("new task added successfully");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal">
        <i
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(closeAddModal());
          }}
          className=" fa-solid fa-xmark"
        ></i>
        <h3 style={{ color: "white" }}>Add a new Task</h3>
        <form>
          <input
            className="input-field2"
            type="text"
            placeholder="Title"
            name="title"
            value={newTask.title}
            onChange={onChangeHandler}
          />
          <textarea
            className="input-field2"
            placeholder="Description"
            name="description"
            value={newTask.description}
            onChange={onChangeHandler}
          />
          <div
            className="input-field2"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label>Priority: </label>
            <RadioInput
              className=" priority-radio"
              label="Low"
              value={1}
              checked={priority}
              setter={setPriority}
            />
            <RadioInput
              className="priority-radio"
              label="Medium"
              value={2}
              checked={priority}
              setter={setPriority}
            />
            <RadioInput
              className="priority-radio"
              label="High"
              value={3}
              checked={priority}
              setter={setPriority}
            />
          </div>
          <input
            className="input-field2"
            type="date"
            onChange={onChangeHandler}
            name="dueDate"
            value={newTask.dueDate}
          />
          <button
            onClick={submitHandler}
            type="submit"
            className="login-button"
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  margin: "auto",
                }}
              >
                <Bars
                  height="2rem"
                  width="2rem"
                  color="#000"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <span>
                Add Task <i class="fa-solid fa-plus"></i>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const Home = () => {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const { taskList, showAddModal } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTasks(authToken));
  }, [authToken, dispatch]);
  return (
    <div className="home-container">
      <Navbar />
      <div className="typewriter">
        <h1> {getGreeting() + ", " + user.name} </h1>
      </div>
      <div className="todo-container">
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(openAddModal());
          }}
          className="add-button"
        >
          Add Task
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h2> Incomplete Tasks</h2>
          <div className="incomplete-task-container">
            {taskList.map((task) => {
              if (task.isCompleted === false)
                return <TaskComponent task={task} />;
              else return <></>;
            })}
          </div>
        </div>
        <hr />
        <div>
          <h2> Completed Tasks</h2>
          <div className="incomplete-task-container">
            {taskList.map((task) => {
              if (task.isCompleted === true)
                return <TaskComponent task={task} />;
              else return <></>;
            })}
          </div>
        </div>
      </div>
      <div>{showAddModal && <AddTaskModal />}</div>
    </div>
  );
};

export default Home;

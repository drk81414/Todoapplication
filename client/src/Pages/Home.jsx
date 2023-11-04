import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Home.css";
import Navbar from "../components/Navbar";
import getGreeting from "../utils/getGreeting";
import { fetchTasks } from "../store/todo/todoSlice";
import TaskComponent from "../components/TaskComponent";

const Home = () => {
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const { taskList } = useSelector((state) => state.todo);

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
        <button className="add-button">Add Task</button>
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
          <div>
            {taskList.map((task) => {
              if (task.isCompleted === true)
                return <TaskComponent task={task} />;
              else return <></>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

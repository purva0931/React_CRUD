import React, { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        console.log(response);
        setTaskList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h3>To Do</h3>
      {taskList.map((task) => (
        <div key={task.id} style={{ border: "1px solid", padding: 10 }}>
          <h3>User ID:{task.userId}</h3>
          <h3>{task.title}</h3>
          <h3>status:{task.completed ? "completed" : "Pending"}</h3>
        </div>
      ))}
    </>
  );
};

export default Todos;

import { store } from "../index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTasks } from "./actions/taskActions";
import axios from "./../axios";
import { taskEndpoints } from "./../shared/config/endpoints";

const Items = () => {
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState([]);
  //   const listTasks = useSelector((state) => state.getTasks);
  //   const { loading, success, error, tasks } = listTasks;

  useEffect(() => {
    //dispatch(getTasks(8));
    axios
      .get(`${taskEndpoints.getTasksByProject}8`, {
        params: {
          page: 0,
          size: 4,
          sort: "asc",
        },
      })
      .then((res) => setTaskList(res.data.content));
    console.log("taskList w pierwszym: ", taskList);
  }, []);

  //   store.subscribe(() => {
  //     // When state will be updated(in our case, when items will be fetched),
  //     // we will update local component state and force component to rerender
  //     // with new data.

  //     setItems({ items: store.getState().items });
  //   });

  return (
    <div>
      {taskList.map((item, id) => (
        <p key={id}> {item} </p>
      ))}
    </div>
  );
};

export default Items;

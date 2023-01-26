import { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";

import { storage } from "../../firebase";
import { taskEndpoints } from "./../../shared/config/endpoints";
import * as actionTypes from "../../store/actions/actionTypes";
import axios from "../../axios";

const FileUploader = ({ taskData }) => {
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState("");
  const dispatch = useDispatch();

  const { userEmail, taskId } = taskData;

  console.log("taskData", taskData);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    console.log("file", file);
    const inputData = {
      resultId: 0,
      studentEmail: userEmail,
      taskId,
      fileName: file.name,
    };
    const jsonBlob = new Blob([JSON.stringify(inputData)], {
      type: "application/json",
    });
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("data", jsonBlob);
    console.log("formData", formData.values());
    const { data } = axios
      .post(taskEndpoints.addTaskResult, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: actionTypes.CREATE_RESULT_FAIL,
          payload: message,
        });
      });
    console.log(data);
  };

  useEffect(() => {
    console.log("fileURL", fileURL);
  }, [fileURL]);

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      {/* <h2>Uploading done {progress}%</h2> */}
    </div>
  );
};

export default FileUploader;

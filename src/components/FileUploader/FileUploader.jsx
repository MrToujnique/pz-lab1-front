import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { taskEndpoints } from "./../../shared/config/endpoints";
import * as actionTypes from "../../store/actions/actionTypes";
import axios from "../../axios";

const FileUploader = ({ taskData }) => {
  const [resultId, setResultId] = useState();
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState();
  const [fileURL, setFileURL] = useState("");
  const dispatch = useDispatch();

  const { userEmail, taskId } = taskData;

  console.log("taskData", taskData);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const downloadBlob = (blob, name) => {
    // if (window.navigator && window.navigator.msSaveOrOpenBlob)
    //   return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  };

  const downloadFile = () => {
    if (resultId && resultId !== 0) {
      const { data } = axios
        .get(`${taskEndpoints.getTaskFile}${resultId}`, {
          responseType: "blob",
        })
        .then((res) => {
          console.log("res", res);
          const downloadDate = new Date().toString();
          // setImageData(res.data.Blob);
          // let buffer = Buffer.from(res.data, "binary");

          // const fileBlob = new Blob([res.data], {
          //   type: res.headers["content-tpe"],
          // });
          console.log("res.data", res.data);
          downloadBlob(res.data, `${downloadDate}.pdf`);
          const fileURL = URL.createObjectURL(res.data);
          setFileURL(fileURL);
          // window.open(fileURL);
        })
        .catch((err) => console.log("err", err));
    }
  };

  useEffect(() => {
    console.log("imageData", imageData);
  }, [imageData]);

  const getUploadedFile = (taskId) => {
    // const taskIdString = taskId.toString();
    // console.log('first', first)
    console.log("taskId", taskId);
    console.log(`${taskEndpoints.getTaskResultsByTask}${taskId}`);
    const { data } = axios
      .get(`${taskEndpoints.getTaskResultsByTask}${taskId}`)
      .then((res) => setResultId(res.data.content[0].resultId))
      .catch((err) => console.log(err));
    console.log("Co podaje GET:", data);
  };

  const uploadFiles = (file) => {
    console.log("file", file);
    const inputData = {
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

  useEffect(() => {
    getUploadedFile(taskId);
  }, []);

  return (
    <div className="App">
      {localStorage.getItem("userType") === "LECTURER" ? (
        <button onClick={downloadFile}>Pobierz plik</button>
      ) : (
        <form onSubmit={formHandler}>
          <input accept=".pdf" type="file" className="input" />
          <button type="submit">Załącz</button>
        </form>
      )}
      <hr />
      {/* <h2>Uploading done {progress}%</h2> */}
      {imageData && imageData}
    </div>
  );
};

export default FileUploader;

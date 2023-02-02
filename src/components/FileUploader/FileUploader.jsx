import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { taskEndpoints } from "./../../shared/config/endpoints";
import * as actionTypes from "../../store/actions/actionTypes";
import axios from "../../axios";
import { Button } from "@chakra-ui/react";

const FileUploader = ({ taskData }) => {
  const [resultId, setResultId] = useState();
  const [imageData, setImageData] = useState();
  const [fileURL, setFileURL] = useState("");
  const [isFileAttached, setIsFileAttached] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const dispatch = useDispatch();

  const { userEmail, taskId } = taskData;

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
      axios
        .get(`${taskEndpoints.getTaskFile}${resultId}`, {
          responseType: "blob",
        })
        .then((res) => {
          const downloadDate = new Date().toString();
          downloadBlob(res.data, `${downloadDate}.pdf`);
        })
        .catch((err) => console.log("err", err));
    }
  };

  const getUploadedFile = () => {
    axios
      .get(`${taskEndpoints.getTaskResultsByTask}${taskId}`)
      .then((res) => {
        setResultId(res.data.content[0].resultId);
      })
      .catch((err) => console.log(err));
  };

  const checkUploadedFile = () => {
    if (resultId && resultId !== 0) {
      axios
        .get(`${taskEndpoints.getTaskFile}${resultId}`)
        .then((res) => {
          const fileURL = URL.createObjectURL(res.data.Blob);
          setFileURL(fileURL);
        })
        .catch((err) => console.log(err));
    }
  };

  const uploadFiles = (file) => {
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
    const { data } = axios
      .post(taskEndpoints.addTaskResult, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.fileName) {
          setIsFileUploaded(true);
        }
      })
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
  };

  useEffect(() => {
    getUploadedFile();
  }, []);

  useEffect(() => {
    if (resultId) {
      checkUploadedFile();
    }
  }, [resultId]);

  return (
    <div className="App">
      {localStorage.getItem("userType") === "LECTURER" &&
        (!resultId ? (
          <span>Brak rozwiązania</span>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "64px",
            }}
          >
            <Button colorScheme="blue" onClick={downloadFile}>
              Pobierz plik
            </Button>
          </div>
        ))}
      {localStorage.getItem("userType") === "STUDENT" &&
        (isFileUploaded || resultId ? (
          <span>Rozwiązanie załączone</span>
        ) : (
          <form onSubmit={formHandler}>
            <input
              accept=".pdf"
              onChange={() => setIsFileAttached(true)}
              type="file"
              className="input"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "64px",
              }}
            >
              <Button
                colorScheme="green"
                type="submit"
                disabled={!isFileAttached}
              >
                Załącz
              </Button>
            </div>
          </form>
        ))}
      <hr />
      {/* <h2>Uploading done {progress}%</h2> */}
      {imageData && imageData}
    </div>
  );
};

export default FileUploader;

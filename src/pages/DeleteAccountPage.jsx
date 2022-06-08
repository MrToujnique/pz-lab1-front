import React from "react";
import { useState } from "react";
import axios from "./../axios";
import { personEndpoints } from "./../shared/config/endpoints";
import { useNavigate } from "react-router-dom";
import AccountModifyLayout from "./../components/AccountModifyLayout/AccountModifyLayout";

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Pomyślnie pobrano token.");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = localStorage.getItem("email");
  const title = "Usuwanie konta";
  const description = "Czy chcesz rozpocząć procedurę usuwania konta?";
  const submitButtonText = "Usuń konto";

  const sendToken = (e) => {
    e.preventDefault();
    axios
      .get(personEndpoints.getPersonToken)
      .then((res) => {
        console.log(res);
        setErrMsg("");
        setSuccess(true);
        setToken(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setErrMsg("Uzyskiwanie tokena nie powiodło się.");
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log({ token: token, password: password });
    if (!password.localeCompare(confirmPassword)) {
      axios
        .delete(personEndpoints.deletePerson, {
          data: {
            token: token,
            password: password,
          },
        })
        .then((res) => {
          console.log(res);
          setErrMsg("");
          setSuccess(true);
          setSuccessText("Pomyślnie usunięto konto.");
          localStorage.clear();
          setTimeout(() => {
            navigate("/logowanie");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
          setErrMsg("Usuwanie nie powiodło się, sprawdź poprawność danych.");
          setTimeout(() => {
            setErrMsg("");
          }, 6000);
        });
    } else {
      setSuccess(false);
      setErrMsg("Hasła się różnią.");
    }
  };

  return (
    <>
      <AccountModifyLayout
        title={title}
        description={description}
        success={success}
        errMsg={errMsg}
        successText={successText}
        sendToken={sendToken}
        navigate={navigate}
        token={token}
        setToken={setToken}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleDelete}
        submitButtonText={submitButtonText}
      />
    </>
  );
};

export default DeleteAccountPage;

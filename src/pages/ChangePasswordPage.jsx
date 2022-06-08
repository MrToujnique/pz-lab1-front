import React from "react";
import AccountModifyLayout from "../components/AccountModifyLayout/AccountModifyLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axios";
import { personEndpoints } from "../shared/config/endpoints";

const ChangePasswordPage = () => {
  const title = "Zmiana hasła";
  const description = "Czy chcesz rozpocząć procedurę zmiany hasła?";
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Pomyślnie pobrano token.");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = localStorage.getItem("email");
  const submitButtonText = "Zmień hasło";

  const sendToken = (e) => {
    e.preventDefault();
    console.log(personEndpoints.getPersonToken);
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
        setErrMsg("Wysyłanie maila nie powiodło się.");
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
      });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!password.localeCompare(confirmPassword)) {
      axios
        .put(personEndpoints.updatePersonPass, {
          token: token,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setErrMsg("");
          setSuccess(true);
          setSuccessText("Pomyślnie zmieniono hasło.");
          localStorage.clear();
          setTimeout(() => {
            navigate("/logowanie");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
          setErrMsg(
            "Zmiana hasła nie powiodła się, sprawdź poprawność danych."
          );
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
        handleSubmit={handlePasswordChange}
        submitButtonText={submitButtonText}
      />
    </>
  );
};

export default ChangePasswordPage;

import React, { useCallback, useMemo, useState } from "react";
import useUserActionCreator from "../actions/user";
import LoginForm from "../components/LoginForm";

const useLoginForm = () => {
  const { error, login } = useUserActionCreator();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserID = useCallback((value: string) => {
    setUserID(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onLogin = useCallback(async () => {
    await login(userID, password);
  }, [login, password, userID]);

  return useMemo(
    () => ({
      error,
      userID,
      password,
      onChangeUserID,
      onChangePassword,
      onLogin,
    }),
    [error, userID, password, onChangeUserID, onChangePassword, onLogin]
  );
};

const Login: React.FC = () => {
  const { error, userID, password, onChangeUserID, onChangePassword, onLogin } =
    useLoginForm();

  return (
    <LoginForm
      error={error}
      userID={userID}
      password={password}
      onChangeUserID={onChangeUserID}
      onChangePassword={onChangePassword}
      onLogin={onLogin}
    />
  );
};

export default Login;

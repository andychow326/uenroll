import React, { useCallback, useMemo, useState } from "react";
import useAuthActionCreator from "../actions/auth";
import useUserActionCreator from "../actions/user";
import AuthForm from "../components/AuthForm";

const useAuthForm = () => {
  const { loading, error, currentAuthMode, login, onChangeAuthMode } =
    useAuthActionCreator();
  const { fetchUserProfile } = useUserActionCreator();
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
    await fetchUserProfile();
  }, [fetchUserProfile, login, password, userID]);

  return useMemo(
    () => ({
      currentAuthMode,
      loading,
      error,
      userID,
      password,
      onChangeAuthMode,
      onChangeUserID,
      onChangePassword,
      onLogin,
    }),
    [
      currentAuthMode,
      loading,
      error,
      userID,
      password,
      onChangeAuthMode,
      onChangeUserID,
      onChangePassword,
      onLogin,
    ]
  );
};

const Authentication: React.FC = () => {
  const {
    currentAuthMode,
    loading,
    error,
    userID,
    password,
    onChangeAuthMode,
    onChangeUserID,
    onChangePassword,
    onLogin,
  } = useAuthForm();

  return (
    <AuthForm
      loading={loading}
      currentAuthMode={currentAuthMode}
      error={error}
      userID={userID}
      password={password}
      onChangeAuthMode={onChangeAuthMode}
      onChangeUserID={onChangeUserID}
      onChangePassword={onChangePassword}
      onLogin={onLogin}
    />
  );
};

export default Authentication;

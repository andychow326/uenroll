import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAuthActionCreator from "../actions/auth";
import useUserActionCreator from "../actions/user";
import AuthForm from "../components/AuthForm";

const useAuthForm = () => {
  const {
    loading,
    error,
    currentAuthMode,
    login,
    resetPassword,
    validateAccessToken,
    onChangeAuthMode,
  } = useAuthActionCreator();
  const { fetchUserProfile } = useUserActionCreator();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onValidateAccessToken = useCallback(async () => {
    const result = await validateAccessToken();
    setUserID(result ?? "");
  }, [validateAccessToken]);

  useEffect(() => {
    onValidateAccessToken().finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeUserID = useCallback((value: string) => {
    setUserID(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onChangeConfirmPassword = useCallback((value: string) => {
    setConfirmPassword(value);
  }, []);

  const onLogin = useCallback(async () => {
    await login(userID, password);
    await fetchUserProfile();
  }, [fetchUserProfile, login, password, userID]);

  const onResetPassword = useCallback(async () => {
    const isSuccess = await resetPassword(password, confirmPassword);
    if (isSuccess) {
      await onLogin();
    }
  }, [confirmPassword, onLogin, password, resetPassword]);

  return useMemo(
    () => ({
      currentAuthMode,
      loading,
      error,
      userID,
      password,
      confirmPassword,
      onChangeAuthMode,
      onChangeUserID,
      onChangePassword,
      onChangeConfirmPassword,
      onLogin,
      onResetPassword,
    }),
    [
      currentAuthMode,
      loading,
      error,
      userID,
      password,
      confirmPassword,
      onChangeAuthMode,
      onChangeUserID,
      onChangePassword,
      onChangeConfirmPassword,
      onLogin,
      onResetPassword,
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
    confirmPassword,
    onChangeAuthMode,
    onChangeUserID,
    onChangePassword,
    onChangeConfirmPassword,
    onLogin,
    onResetPassword,
  } = useAuthForm();

  return (
    <AuthForm
      loading={loading}
      currentAuthMode={currentAuthMode}
      error={error}
      userID={userID}
      password={password}
      confirmPassword={confirmPassword}
      onChangeAuthMode={onChangeAuthMode}
      onChangeUserID={onChangeUserID}
      onChangePassword={onChangePassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      onLogin={onLogin}
      onResetPassword={onResetPassword}
    />
  );
};

export default Authentication;

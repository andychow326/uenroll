import React, { ReactElement, useCallback, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Icon, Image } from "semantic-ui-react";
import { useTextFieldChange } from "../../hooks/component";
import InputWithErrorField from "../InputWithErrorField";
import type { Error } from "../../trpc";
import { AuthMode } from "../../constants";

import styles from "./styles.module.css";

const mapMainFormTitle: Record<AuthMode, string> = {
  login: "AuthForm.login.title",
  forgotPassword: "AuthForm.forgot-password.title",
  resetPassword: "AuthForm.reset-password.title",
} as const;

const mapSubmitButtonLabel: Record<AuthMode, string> = {
  login: "AuthForm.login.button.label",
  forgotPassword: "AuthForm.forgot-password.button.label",
  resetPassword: "AuthForm.reset-password.button.label",
} as const;

interface MainFormProps {
  loading: boolean;
  showBackButton?: boolean;
  titleTextID: string;
  submitButtonLabelID: string;
  error: Error | null;
  children: ReactElement | ReactElement[];
  onBack?: () => void;
  onSubmit: () => void;
}

const MainForm: React.FC<MainFormProps> = (props) => {
  const {
    loading,
    showBackButton = false,
    titleTextID,
    submitButtonLabelID,
    error,
    children,
    onBack,
    onSubmit,
  } = props;

  return (
    <div className={styles.form}>
      <div className={styles.backButton} onClick={onBack}>
        {showBackButton && (
          <>
            <Icon name="angle left" />
            <FormattedMessage id="AuthForm.back-button.label" />
          </>
        )}
      </div>
      <div className={styles.formTitle}>
        <FormattedMessage id={titleTextID} />
      </div>
      <div className={styles.formBody}>{children}</div>
      <div className={styles.submitSection}>
        <Button
          loading={loading}
          className={styles.button}
          color="black"
          onClick={onSubmit}
        >
          <FormattedMessage id={submitButtonLabelID} />
        </Button>
        <div className={styles.error}>{error?.message}</div>
      </div>
    </div>
  );
};

interface AuthFormProps {
  loading: boolean;
  error: Error | null;
  userID: string;
  password: string;
  currentAuthMode: AuthMode;
  onChangeUserID: (value: string) => void;
  onChangePassword: (value: string) => void;
  onLogin: () => void;
  onChangeAuthMode: (newAuthMode: AuthMode) => void;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const {
    loading,
    currentAuthMode,
    error,
    userID,
    password,
    onChangeAuthMode,
    onChangeUserID,
    onChangePassword,
    onLogin,
  } = props;
  const intl = useIntl();

  const onChangeLoginMode = useCallback(() => {
    onChangeAuthMode(AuthMode.login);
  }, [onChangeAuthMode]);

  const onChangeForgotPasswordMode = useCallback(() => {
    onChangeAuthMode(AuthMode.forgotPassword);
  }, [onChangeAuthMode]);

  const onChangeUserIDField = useTextFieldChange(onChangeUserID);
  const onChangePasswordField = useTextFieldChange(onChangePassword);

  const commonMainFormProps = useMemo(
    () => ({
      error,
      loading,
      titleTextID: mapMainFormTitle[currentAuthMode],
      submitButtonLabelID: mapSubmitButtonLabel[currentAuthMode],
    }),
    [currentAuthMode, error, loading]
  );

  const commonInputUserIDProps = useMemo(
    () => ({
      loading,
      focus: true,
      errorData: error,
      className: styles.inputBlock,
      inputClassName: styles.input,
      placeholder: intl.formatMessage({
        id: "AuthForm.user-id.placeholder",
      }),
      name: "userID",
      value: userID,
      onChange: onChangeUserIDField,
    }),
    [error, intl, loading, onChangeUserIDField, userID]
  );

  const commonInputPasswordProps = useMemo(
    () => ({
      loading,
      focus: true,
      errorData: error,
      className: styles.inputBlock,
      inputClassName: styles.input,
      type: "password",
    }),
    [error, loading]
  );

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.brand}>
          <Image
            src={intl.formatMessage({ id: "app.logo.uri" })}
            size="medium"
          />
          <div className={styles.brandTitle}>
            <FormattedMessage id="AuthForm.title" />
          </div>
        </div>
        {currentAuthMode === "login" && (
          <MainForm {...commonMainFormProps} onSubmit={onLogin}>
            <InputWithErrorField {...commonInputUserIDProps} />
            <InputWithErrorField
              {...commonInputPasswordProps}
              placeholder={intl.formatMessage({
                id: "AuthForm.password.placeholder",
              })}
              name="password"
              value={password}
              onChange={onChangePasswordField}
            />
            <div
              className={styles.forgotPassword}
              onClick={onChangeForgotPasswordMode}
            >
              <FormattedMessage id="AuthForm.forgot-password.label" />
            </div>
          </MainForm>
        )}
        {currentAuthMode === "forgotPassword" && (
          <MainForm
            {...commonMainFormProps}
            showBackButton
            onBack={onChangeLoginMode}
            onSubmit={() => {}}
          >
            <InputWithErrorField {...commonInputUserIDProps} />
          </MainForm>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

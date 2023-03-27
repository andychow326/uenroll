import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Image } from "semantic-ui-react";
import { useTextFieldChange } from "../../hooks/component";
import InputWithErrorField from "../InputWithErrorField";
import type { Error } from "../../trpc";

import styles from "./styles.module.css";

interface LoginFormProps {
  error: Error | null;
  userID: string;
  password: string;
  onChangeUserID: (value: string) => void;
  onChangePassword: (value: string) => void;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { error, userID, password, onChangeUserID, onChangePassword, onLogin } =
    props;
  const intl = useIntl();

  const onChangeUserIDField = useTextFieldChange(onChangeUserID);
  const onChangePasswordField = useTextFieldChange(onChangePassword);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.brand}>
          <Image
            src={intl.formatMessage({ id: "app.logo.uri" })}
            size="medium"
          />
          <div className={styles.brandTitle}>
            <FormattedMessage id="LoginForm.title" />
          </div>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.loginFormTitle}>
            <FormattedMessage id="LoginForm.welcome-back" />
          </div>
          <div className={styles.loginFormBody}>
            <InputWithErrorField
              focus
              errorData={error}
              className={styles.inputBlock}
              inputClassName={styles.input}
              placeholder={intl.formatMessage({
                id: "LoginForm.user-id.placeholder",
              })}
              name="userID"
              value={userID}
              onChange={onChangeUserIDField}
            />
            <InputWithErrorField
              focus
              errorData={error}
              className={styles.inputBlock}
              inputClassName={styles.input}
              placeholder={intl.formatMessage({
                id: "LoginForm.password.placeholder",
              })}
              type="password"
              name="password"
              value={password}
              onChange={onChangePasswordField}
            />
            <div className={styles.forgotPassword}>
              <FormattedMessage id="LoginForm.forgot-password.label" />
            </div>
          </div>
          <div className={styles.submitSection}>
            <Button
              className={styles.loginFormButton}
              color="black"
              onClick={onLogin}
            >
              <FormattedMessage id="LoginForm.login-button.label" />
            </Button>
            <div className={styles.error}>{error?.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

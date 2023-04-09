import cn from "classnames";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Input, InputProps } from "semantic-ui-react";
import type { Error } from "../../trpc";

import styles from "./styles.module.css";

interface InputWithErrorFieldProps extends InputProps {
  name: string;
  errorData: Error | null;
  className?: string;
  inputClassName?: string;
  messageClassName?: string;
  labelID?: string;
}

const InputWithErrorField: React.FC<InputWithErrorFieldProps> = (props) => {
  const {
    loading,
    name,
    errorData: error,
    className,
    inputClassName,
    messageClassName,
    labelID,
    disabled,
  } = props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (error == null) {
      setMessage("");
    }
    setMessage(error?.data.zodError?.fieldErrors[name]?.[0] ?? "");
  }, [error, name]);

  return (
    <div className={cn(styles.container, className)}>
      {labelID != null && (
        <div className={styles.label}>
          <FormattedMessage id={labelID} />
        </div>
      )}
      <Input
        {...props}
        disabled={disabled ?? loading}
        error={message.length > 0}
        className={cn(styles.input, inputClassName)}
      />
      <div className={cn(styles.message, messageClassName)}>{message}</div>
    </div>
  );
};

export default InputWithErrorField;

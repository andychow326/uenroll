/* eslint-disable import/prefer-default-export */
import { ChangeEvent, useCallback } from "react";
import { InputOnChangeData } from "semantic-ui-react";

export function useTextFieldChange(cb: (value: string) => void) {
  return useCallback(
    (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      cb(data.value || "");
    },
    [cb]
  );
}

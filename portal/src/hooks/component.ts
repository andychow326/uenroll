/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { ChangeEvent, useCallback } from "react";
import { CheckboxProps, InputOnChangeData } from "semantic-ui-react";

export function useTextFieldChange(cb: (value: string) => void) {
  return useCallback(
    (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      cb(data.value || "");
    },
    [cb]
  );
}

export function useCheckboxChange(cb: (value: any) => void) {
  return useCallback(
    (_event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      cb(data.value);
    },
    [cb]
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { ChangeEvent, useCallback } from "react";
import {
  CheckboxProps,
  DropdownProps,
  InputOnChangeData,
  TextAreaProps,
} from "semantic-ui-react";

export function useTextFieldChange(cb: (value: string) => void) {
  return useCallback(
    (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      cb(data.value || "");
    },
    [cb]
  );
}

export function useTextAreaChange(cb: (value: string) => void) {
  return useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
      cb(data.value?.toString() || "");
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

export function useDropdownChange(cb: (value: any) => void) {
  return useCallback(
    (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      cb(data.value);
    },
    [cb]
  );
}

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { FormattedMessage, useIntl } from "react-intl"; //check
import { Header } from "semantic-ui-react"; //check
import useAdminActionCreator from "../actions/admin";
//import EditUserModal from "../components/EditUserModal";
import OpenedCourseTableDetailsCell from "../components/OpenedCourseTableDetailsCell"; //check
import Table from "../components/Table"; //check
import TableRowCell from "../components/TableRowCell"; //check
//import { useEditUserModal } from "../hooks/modal";
import { useCourseSearchBar } from "../hooks/searchBar";
import {
  CourseProfile,
  OpenedCourseProfile,
  SearchBarItem,
  TableColumnOption,
  TableRowCellOption,
} from "../types";

function useUserManagement() {
  
};

export default CourseManagement;

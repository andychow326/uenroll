import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Header } from "semantic-ui-react";
import Table from "../components/Table";
import { CourseType } from "../types";
import { useCourseSearch } from "./CourseSearch";

const CourseManagement: React.FC = () => {
  const [type, setType] = useState<CourseType>(CourseType.course);
  const {
    loading,
    currentPage,
    totalPages,
    courseList,
    searchBarItems,
    tableColumnOptions,
    onSearch,
    onClearFilter,
    onRenderTableRow,
    onChangePage,
  } = useCourseSearch(type, setType);

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="CourseManagement.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        onClearFilter={onClearFilter}
        columnOptions={tableColumnOptions}
        tableData={courseList ?? []}
        onRenderRow={onRenderTableRow}
        showPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
        showHeaderButton
        headerButtonLabelID="CourseManagement.table.header.add-button.label"
        // TODO: Implement header button
      />
    </>
  );
};

export default CourseManagement;

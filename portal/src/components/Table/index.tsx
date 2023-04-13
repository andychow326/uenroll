import React, { ReactNode, useCallback, useId } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Loader, Pagination, PaginationProps } from "semantic-ui-react";
import { SearchBarItem, TableColumnOption } from "../../types";
import SearchBar from "../SearchBar";

import styles from "./styles.module.css";

interface TableProps<T> {
  loading?: boolean;
  showPagination?: boolean;
  totalPages?: number;
  currentPage?: number;
  onChangePage?: (page: number) => void;
  searchBarItems?: SearchBarItem[];
  columnOptions: TableColumnOption[];
  showHeaderButton?: boolean;
  headerButtonLabelID?: string;
  tableData: T[];
  onRenderRow: (data: T) => ReactNode;
  onClickHeaderButton?: () => void;
  onSearch?: () => void;
  onClearFilter?: () => void;
}

const Table = <T,>(props: TableProps<T>): JSX.Element => {
  const {
    loading,
    showPagination,
    totalPages,
    currentPage,
    onChangePage,
    searchBarItems,
    columnOptions,
    showHeaderButton = false,
    headerButtonLabelID,
    tableData,
    onRenderRow,
    onClickHeaderButton,
    onSearch,
    onClearFilter,
  } = props;
  const id = useId();

  const onChangeCurrentPage = useCallback(
    (
      _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      data: PaginationProps
    ) => {
      onChangePage?.(data.activePage as number);
    },
    [onChangePage]
  );

  return (
    <div className={styles.container}>
      {searchBarItems && onClearFilter && onSearch && (
        <SearchBar
          items={searchBarItems}
          onClearFilter={onClearFilter}
          onSearch={onSearch}
        />
      )}
      <div className={styles.header}>
        <div className={styles.headerColumns}>
          {columnOptions.map((item, index) =>
            item.type === "text" ? (
              <div key={`${id}-${index}`} style={{ width: item.width }}>
                <FormattedMessage id={item.headerLabelID} />
              </div>
            ) : item.type === "component" ? (
              <div key={`${id}-${index}`} style={{ width: item.width }}>
                {item.headerLabel}
              </div>
            ) : null
          )}
        </div>
        {showHeaderButton && (
          <Button color="green" onClick={onClickHeaderButton}>
            <FormattedMessage id={headerButtonLabelID} />
          </Button>
        )}
      </div>
      <div className={styles.body}>
        {loading ? (
          <Loader active={loading} inline="centered" />
        ) : (
          tableData.map((item) => onRenderRow(item))
        )}
      </div>
      {showPagination && (
        <div className={styles.paginator}>
          <Pagination
            totalPages={totalPages ?? 0}
            activePage={currentPage}
            onPageChange={onChangeCurrentPage}
            boundaryRange={2}
            siblingRange={2}
          />
        </div>
      )}
    </div>
  );
};

export default Table;

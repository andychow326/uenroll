import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Loader } from "semantic-ui-react";
import { SearchBarItem, TableColumnOption } from "../../types";
import SearchBar from "../SearchBar";

import styles from "./styles.module.css";

interface TableProps {
  loading?: boolean;
  searchBarItems: SearchBarItem[];
  columnOptions: TableColumnOption[];
  showHeaderButton?: boolean;
  headerButtonLabelID?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRenderRow: (data: any) => ReactNode;
  onClickHeaderButton?: () => void;
  onSearch: () => void;
}

const Table: React.FC<TableProps> = (props) => {
  const {
    loading,
    searchBarItems,
    columnOptions,
    showHeaderButton = false,
    headerButtonLabelID,
    tableData,
    onRenderRow,
    onClickHeaderButton,
    onSearch,
  } = props;

  return (
    <div className={styles.container}>
      <SearchBar items={searchBarItems} onSearch={onSearch} />
      <div className={styles.header}>
        <div className={styles.headerColumns}>
          {columnOptions.map((item) => (
            <div key={item.headerLabelID} style={{ width: item.width }}>
              <FormattedMessage id={item.headerLabelID} />
            </div>
          ))}
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
    </div>
  );
};

export default Table;

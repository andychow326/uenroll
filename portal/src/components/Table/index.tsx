import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "semantic-ui-react";
import { SearchBarItem, TableColumnOption } from "../../types";
import SearchBar from "../SearchBar";

import styles from "./styles.module.css";

interface TableProps {
  searchBarItems: SearchBarItem[];
  columnOptions: TableColumnOption[];
  showHeaderButton?: boolean;
  headerButtonLabelID?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRenderRow: (data: any) => ReactNode;
  onClickheaderButton?: () => void;
  onSearch: () => void;
}

const Table: React.FC<TableProps> = (props) => {
  const {
    searchBarItems,
    columnOptions,
    showHeaderButton = false,
    headerButtonLabelID,
    tableData,
    onRenderRow,
    onClickheaderButton,
    onSearch,
  } = props;

  return (
    <>
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
          <Button color="green" onClick={onClickheaderButton}>
            <FormattedMessage id={headerButtonLabelID} />
          </Button>
        )}
      </div>
      <div className={styles.body}>
        {tableData.map((item) => onRenderRow(item))}
      </div>
    </>
  );
};

export default Table;

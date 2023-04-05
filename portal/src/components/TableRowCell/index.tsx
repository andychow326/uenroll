import React, { ReactNode, useCallback, useId, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "semantic-ui-react";
import { TableRowCellOption } from "../../types";

import styles from "./styles.module.css";

interface TableRowCellProps {
  columnOptions: TableRowCellOption[];
  showDetailButton?: boolean;
  detailButtonLabelID?: string;
  hideDetailButtonLabelID?: string;
  DetailInfo?: ReactNode;
  onClickDetailButton?: () => void;
}

const TableRowCell: React.FC<TableRowCellProps> = (props) => {
  const {
    columnOptions,
    showDetailButton = false,
    detailButtonLabelID,
    hideDetailButtonLabelID,
    onClickDetailButton,
    DetailInfo,
  } = props;
  const id = useId();
  const [isDetailInfoVisible, setIsDetailInfoVisible] = useState(false);

  const onClickedDetailButton = useCallback(() => {
    onClickDetailButton?.();
    setIsDetailInfoVisible((value) => !value);
  }, [onClickDetailButton]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowData}>
          {columnOptions.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${id}-${index}`} style={{ width: item.width }}>
              {item.value}
            </div>
          ))}
        </div>
        {showDetailButton && (
          <Button circular onClick={onClickedDetailButton}>
            <FormattedMessage
              id={
                isDetailInfoVisible
                  ? hideDetailButtonLabelID
                  : detailButtonLabelID
              }
            />
          </Button>
        )}
      </div>
      {isDetailInfoVisible && (
        <div className={styles.details}>{DetailInfo}</div>
      )}
    </>
  );
};

export default TableRowCell;

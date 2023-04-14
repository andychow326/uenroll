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
  showSecondaryButton?: boolean;
  secondaryButtonLabelID?: string;
  DetailInfo?: ReactNode;
  onClickDetailButton?: () => void;
  onClickSecondaryButton?: () => void;
}

const TableRowCell: React.FC<TableRowCellProps> = (props) => {
  const {
    columnOptions,
    showDetailButton = false,
    detailButtonLabelID,
    hideDetailButtonLabelID,
    showSecondaryButton,
    secondaryButtonLabelID,
    onClickDetailButton,
    onClickSecondaryButton,
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
            <div key={`${id}-${index}`} style={item.styles}>
              {item.value}
            </div>
          ))}
        </div>
        <div>
          {showSecondaryButton && (
            <Button circular onClick={onClickSecondaryButton}>
              <FormattedMessage id={secondaryButtonLabelID} />
            </Button>
          )}
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
      </div>
      {isDetailInfoVisible && (
        <div className={styles.details}>{DetailInfo}</div>
      )}
    </>
  );
};

export default TableRowCell;

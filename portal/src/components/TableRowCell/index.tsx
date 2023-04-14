import React, { ReactNode, useCallback, useId, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Checkbox } from "semantic-ui-react";
import { TableRowCellOption } from "../../types";

import routes from "../../routes";
import styles from "./styles.module.css";

interface TableRowCellProps {
  columnOptions: TableRowCellOption[];
  showDetailButton?: boolean;
  detailButtonLabelID?: string;
  hideDetailButtonLabelID?: string;
  showSecondaryButton?: boolean;
  secondaryButtonLabelID?: string;
  DetailInfo?: ReactNode;
  showCheckbox?: boolean;
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
    showCheckbox = false,
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
        {showCheckbox && <Checkbox />}
        <div className={styles.rowData}>
          {columnOptions.map((item, index) => (
            <a
              key={`${id}-${index}`}
              style={item.styles}
              href={routes.courseDetail.path}
            >
              {item.value}
            </a>
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

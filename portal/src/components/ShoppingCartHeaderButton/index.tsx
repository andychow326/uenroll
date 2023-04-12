import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "semantic-ui-react";

import styles from "./styles.module.css";

interface ShoppingCartProps {
  onEnroll: () => void;
  onDelete: () => void;
  onVaildate: () => void;
}

const ShoppingCartHeaderButton: React.FC<ShoppingCartProps> = (props) => {
  const { onEnroll, onDelete, onVaildate } = props;

  return (
    <div className={styles.container}>
      {/* TODO: Implement delete button "onClick={onEnroll}" */}
      <Button color="orange">
        <FormattedMessage id="ShoppingCart.enroll-button.label" />
      </Button>
      {/* TODO: Implement delete button "onClick={onDelete}" */}
      <Button color="grey">
        <FormattedMessage id="ShoppingCart.delete-button.label" />
      </Button>
      {/* TODO: Implement vaildate button "onClick={onVaildate}" */}
      <Button color="grey">
        <FormattedMessage id="ShoppingCart.vaildate-button.label" />
      </Button>
    </div>
  );
};

export default ShoppingCartHeaderButton;

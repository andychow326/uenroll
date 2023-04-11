import React, { useId } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "semantic-ui-react";
import { useTextFieldChange } from "../../hooks/component";
import { SearchBarItem } from "../../types";

import styles from "./styles.module.css";

interface SearchBarProps {
  items: SearchBarItem[];
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { items, onSearch } = props;
  const id = useId();

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {items.map((item, index) => (
          <div className={styles.option} key={`${id}-${index}`}>
            <FormattedMessage id={item.labelID} />
            {item.type === "textField" ? (
              <Input
                // eslint-disable-next-line react-hooks/rules-of-hooks
                onChange={useTextFieldChange(item.onChange)}
                value={item.value}
                key={item.labelID}
              />
            ) : null}
          </div>
        ))}
      </div>
      <Button color="orange" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;

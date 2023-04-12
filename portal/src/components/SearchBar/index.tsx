import React, { useCallback, useId } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Icon, Input } from "semantic-ui-react";
import { useTextFieldChange } from "../../hooks/component";
import { SearchBarItem } from "../../types";

import styles from "./styles.module.css";

interface SearchBarProps {
  items: SearchBarItem[];
  onSearch: () => void;
  onClearFilter: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { items, onSearch, onClearFilter } = props;
  const id = useId();

  const onClickSearchButton = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const onClickClearFilter = useCallback(() => {
    onClearFilter();
  }, [onClearFilter]);

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
      <div>
        <Button animated onClick={onClickClearFilter}>
          <Button.Content visible>
            <FormattedMessage id="SearchBar.button.clear-filter.label" />
          </Button.Content>
          <Button.Content hidden>
            <Icon name="undo" />
          </Button.Content>
        </Button>
        <Button color="orange" onClick={onClickSearchButton}>
          <FormattedMessage id="SearchBar.button.search.label" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

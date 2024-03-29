import cn from "classnames";
import React, { useCallback, useId } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Dropdown, Icon, Input } from "semantic-ui-react";
import { useDropdownChange, useTextFieldChange } from "../../hooks/component";
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
        {items.map((item, index) => {
          if (item == null) return null;
          return (
            <div
              className={cn(
                styles.option,
                item.hidden ? styles.hidden : undefined
              )}
              key={`${id}-${index}`}
            >
              <FormattedMessage id={item.labelID} />
              {item.type === "textField" ? (
                <Input
                  className={item.hidden ? styles.hidden : undefined}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  onChange={useTextFieldChange(item.onChange)}
                  value={item.value}
                  key={item.labelID}
                />
              ) : item.type === "dropdown" ? (
                <Dropdown
                  className={item.hidden ? styles.hidden : undefined}
                  selection
                  options={item.options}
                  value={item.value}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  onChange={useDropdownChange(item.onChange)}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className={styles.buttonSet}>
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

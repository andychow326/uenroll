import React, { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Dropdown, Icon, Image } from "semantic-ui-react";
import useAuthActionCreator from "../../actions/auth";
import { useUser } from "../../contexts/UserProvider";
import styles from "./styles.module.css";

const TopBar: React.FC = () => {
  const { userProfile } = useUser();
  const { loading, logout } = useAuthActionCreator();
  const intl = useIntl();

  const dropdownTrigger = useMemo(
    () => (
      <Button circular>
        <div className={styles.dropdownButton}>
          <div className={styles.dropdownButtonInfo}>
            <Icon size="large" name="user" />
            <FormattedMessage
              id="TopBar.dropdown.name.label"
              values={{
                firstName: userProfile?.firstName,
                lastName: userProfile?.lastName,
              }}
            />
          </div>
          <Icon name="angle down" />
        </div>
      </Button>
    ),
    [userProfile?.firstName, userProfile?.lastName]
  );

  return (
    <div className={styles.container}>
      <Image
        className={styles.item}
        src={intl.formatMessage({ id: "app.logo.uri" })}
        size="small"
      />
      <Dropdown
        simple
        className={styles.item}
        icon={null}
        trigger={dropdownTrigger}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            className={styles.dropdownItem}
            disabled={loading}
            onClick={logout}
          >
            <Icon name="log out" />
            <FormattedMessage id="TopBar.dropdown.options.logout.label" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TopBar;

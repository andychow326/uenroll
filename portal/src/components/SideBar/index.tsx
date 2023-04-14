import cn from "classnames";
import React, { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { useUser } from "../../contexts/UserProvider";
import routes from "../../routes";

import styles from "./styles.module.css";

interface MenuItemProps {
  icon: SemanticICONS;
  textID: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { icon, textID, path } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const onClickItem = useCallback(() => {
    navigate(path);
  }, [navigate, path]);

  const isActive = useMemo(
    () =>
      path === routes.prefix
        ? location.pathname === path
        : location.pathname.startsWith(path),
    [location.pathname, path]
  );

  return (
    <div
      className={cn(styles.menuItem, isActive && styles.activeMenuItem)}
      onClick={onClickItem}
    >
      <Icon inverted={isActive} name={icon} size="large" />
      <span className={cn(styles.menuText, isActive && styles.activeMenuText)}>
        <FormattedMessage id={textID} />
      </span>
    </div>
  );
};

const SideBar: React.FC = () => {
  const { userProfile } = useUser();

  const studentMenuItems = useMemo(
    (): MenuItemProps[] => [
      {
        icon: "home",
        textID: "SideBar.menu.student.home.label",
        path: routes.prefix,
      },
      {
        icon: "search",
        textID: "SideBar.menu.student.course-search.label",
        path: routes.course.path,
      },
      {
        icon: "shopping cart",
        textID: "SideBar.menu.student.shopping-cart.label",
        path: routes.shoppingCart.path,
      },
      {
        icon: "shopping bag",
        textID: "SideBar.menu.student.drop-classes.label",
        path: routes.dropClasses.path,
      },
      {
        icon: "calendar",
        textID: "SideBar.menu.student.time-table.label",
        path: routes.timeTable.path,
      },
      {
        icon: "file alternate",
        textID: "SideBar.menu.student.enrollment-status.label",
        path: routes.enrollmentStatus.path,
      },
    ],
    []
  );

  const adminMenuItems = useMemo(
    (): MenuItemProps[] => [
      // {
      //   icon: "home",
      //   textID: "SideBar.menu.student.home.label",
      //   path: routes.prefix,
      // },
      {
        icon: "folder open",
        textID: "SideBar.menu.admin.course-management.label",
        path: routes.manage.course.path,
      },
      {
        icon: "user",
        textID: "SideBar.menu.admin.user-management.label",
        path: routes.manage.user.path,
      },
    ],
    []
  );

  const menuItems = userProfile?.isAdmin ? adminMenuItems : studentMenuItems;

  return (
    <div className={styles.container}>
      <div className={styles.top}>{/* TODO: collapse icon */}</div>
      <div className={styles.menu}>
        {menuItems.map((item) => (
          <MenuItem key={item.textID} {...item} />
        ))}
      </div>
      <div className={styles.bottom}>{/* TODO: bottom item */}</div>
    </div>
  );
};

export default SideBar;

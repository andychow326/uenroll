import React, { ReactElement } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import styles from "./styles.module.css";

interface ScreenLayoutProps {
  children: ReactElement;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.body}>
        <div className={styles.sideBar}>
          <SideBar />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default ScreenLayout;

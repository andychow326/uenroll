import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";

const Root: React.FC = () => {
  const { sessionID } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle unauthenticated users
  useEffect(() => {
    if (!location.pathname.startsWith(routes.auth.path) && sessionID == null) {
      navigate(routes.auth.path);
    }
  }, [location, navigate, sessionID]);

  return <Outlet />;
};

export default Root;

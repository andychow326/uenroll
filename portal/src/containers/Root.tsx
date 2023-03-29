import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";

const Root: React.FC = () => {
  const { sessionID } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle unauthenticated users
    if (!location.pathname.startsWith(routes.auth.path) && sessionID == null) {
      navigate(routes.auth.path);
    }
    // Handle authenticated users
    if (location.pathname.startsWith(routes.auth.path) && sessionID != null) {
      navigate(routes.prefix);
    }
  }, [location, navigate, sessionID]);

  return <Outlet />;
};

export default Root;

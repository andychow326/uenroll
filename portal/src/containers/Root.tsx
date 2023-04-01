import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUserActionCreator from "../actions/user";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";

const Root: React.FC = () => {
  const { userProfile, sessionID } = useUser();
  const { validateSession, fetchUserProfile } = useUserActionCreator();
  const navigate = useNavigate();
  const location = useLocation();

  const onValidateSession = useCallback(async () => {
    if (location.pathname.startsWith(routes.auth.path)) {
      return;
    }
    await validateSession();
  }, [location.pathname, validateSession]);

  useEffect(() => {
    // Handle unauthenticated users
    if (!location.pathname.startsWith(routes.auth.path) && sessionID == null) {
      navigate(routes.auth.path);
    }
    // Handle authenticated users
    if (location.pathname.startsWith(routes.auth.path) && sessionID != null) {
      navigate(routes.prefix);
    }
    if (userProfile == null && sessionID != null) {
      fetchUserProfile().finally(() => {});
    }
  }, [fetchUserProfile, location, navigate, sessionID, userProfile]);

  useEffect(() => {
    // Handle auto-logout for expired sessions
    const validateSessionInterval = setInterval(onValidateSession, 5000);

    return () => {
      clearInterval(validateSessionInterval);
    };
  }, [onValidateSession]);

  return <Outlet />;
};

export default Root;

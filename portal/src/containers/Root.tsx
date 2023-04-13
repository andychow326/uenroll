import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUserActionCreator from "../actions/user";
import ScreenLayout from "../components/ScreenLayout";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";

const Root: React.FC = () => {
  const { sessionID } = useUser();
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
  }, [location, navigate, sessionID]);

  useEffect(() => {
    // Handle auto-logout for expired sessions
    const validateSessionInterval = setInterval(onValidateSession, 60000);

    return () => {
      clearInterval(validateSessionInterval);
    };
  }, [onValidateSession]);

  useEffect(() => {
    validateSession().finally(null);
    fetchUserProfile().finally(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (location.pathname.startsWith(routes.auth.path)) {
    return <Outlet />;
  }

  return (
    <ScreenLayout>
      <Outlet />
    </ScreenLayout>
  );
};

export default Root;

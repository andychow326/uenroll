import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";

const Home: React.FC = () => {
  const { sessionID } = useUser();

  if (sessionID == null) {
    return <Navigate to={routes.login} />;
  }

  return <div>Home</div>;
};

export default Home;

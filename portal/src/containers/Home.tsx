import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import routes from "../routes";
import StudentHome from "./StudentHome";

const Home: React.FC = () => {
  const { userProfile } = useUser();
  return userProfile?.isAdmin ? (
    <Navigate to={routes.manage.course.path} />
  ) : (
    <StudentHome />
  );
};

export default Home;

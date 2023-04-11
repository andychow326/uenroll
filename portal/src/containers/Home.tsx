import React from "react";
import { useUser } from "../contexts/UserProvider";
import AdminHome from "./AdminHome";
import StudentHome from "./StudentHome";

const Home: React.FC = () => {
  const { userProfile } = useUser();
  return userProfile?.isAdmin ? <AdminHome /> : <StudentHome />;
};

export default Home;

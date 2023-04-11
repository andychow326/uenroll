import React from "react";
import { useUser } from "../contexts/UserProvider";
import StudentHome from "./StudentHome";

const Home: React.FC = () => {
  const { userProfile } = useUser();
  return userProfile?.isAdmin ? <div>Admin Home</div> : <StudentHome />;
};

export default Home;

import React from "react";
import { useUser } from "../contexts/UserProvider";

const Home: React.FC = () => {
  const { userProfile } = useUser();
  if (userProfile?.isAdmin) {
    return <div>Admin Home</div>;
  }

  return <div>Student Home</div>;
};

export default Home;

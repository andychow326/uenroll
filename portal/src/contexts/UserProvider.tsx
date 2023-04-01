import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { UserProfile } from "../types";
import { getStorageItem, setStorageItem, StorageKey } from "../utils/storage";

interface UserContextValue {
  sessionID: string | null;
  userProfile: UserProfile | null;
  updateSessionID: (newSessionID: string | null) => void;
  updateUserProfile: (newUserProfile: UserProfile | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  sessionID: null,
  userProfile: null,
  updateSessionID: () => {},
  updateUserProfile: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = (props) => {
  const { children } = props;
  const [sessionID, setSessionID] = useState<string | null>(() =>
    getStorageItem(StorageKey.SessionID)
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateSessionID = useCallback((newSessionID: string | null) => {
    setStorageItem(StorageKey.SessionID, newSessionID);
    setSessionID(newSessionID);
  }, []);

  const updateUserProfile = useCallback(
    (newUserProfile: UserProfile | null) => {
      setUserProfile(newUserProfile);
    },
    []
  );

  const value = useMemo(
    () => ({ sessionID, userProfile, updateSessionID, updateUserProfile }),
    [sessionID, userProfile, updateSessionID, updateUserProfile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

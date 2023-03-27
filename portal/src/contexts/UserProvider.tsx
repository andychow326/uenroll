import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getStorageItem, setStorageItem, StorageKey } from "../utils/storage";

interface UserContextValue {
  sessionID: string | null;
  updateSessionID: (newSessionID: string | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  sessionID: null,
  updateSessionID: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = (props) => {
  const { children } = props;
  const [sessionID, setSessionID] = useState<string | null>(
    getStorageItem(StorageKey.SessionID)
  );

  const updateSessionID = useCallback((newSessionID: string | null) => {
    setStorageItem(StorageKey.SessionID, newSessionID);
    setSessionID(newSessionID);
  }, []);

  const value = useMemo(
    () => ({ sessionID, updateSessionID }),
    [sessionID, updateSessionID]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

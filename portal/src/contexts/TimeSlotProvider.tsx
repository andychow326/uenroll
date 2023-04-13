import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSafeQuery } from "../hooks/query";
import trpc from "../trpc";
import { TimeSlot } from "../types";

interface TimeSlotContextValue {
  timeSlots: TimeSlot[];
  getTimeSlotsByIDs: (ids: string[]) => TimeSlot[];
}

export const TimeSlotContext = createContext<TimeSlotContextValue>({
  timeSlots: [],
  getTimeSlotsByIDs: () => [],
});

export const useTimeSlot = () => useContext(TimeSlotContext);

interface TimeSlotProviderProps {
  children: ReactNode;
}

const TimeSlotProvider: React.FC<TimeSlotProviderProps> = (props) => {
  const { children } = props;
  const apiClient = trpc.useContext();
  const { safeQuery } = useSafeQuery();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    safeQuery(() => apiClient.course.timeSlot.fetch())
      .then((result) => setTimeSlots((result as TimeSlot[]) ?? []))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTimeSlotsByIDs = useCallback(
    (ids: string[]) => timeSlots.filter((item) => ids.includes(item.id)),
    [timeSlots]
  );

  const value = useMemo(
    () => ({
      timeSlots,
      getTimeSlotsByIDs,
    }),
    [getTimeSlotsByIDs, timeSlots]
  );

  return (
    <TimeSlotContext.Provider value={value}>
      {children}
    </TimeSlotContext.Provider>
  );
};

export default TimeSlotProvider;

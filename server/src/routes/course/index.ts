import trpc from "../../trpc";
import availablePeriod from "./availablePeriod";
import count from "./count";
import create from "./create";
import list from "./list";
import timeSlot from "./timeSlot";

const course = trpc.router({
  availablePeriod,
  count,
  list,
  timeSlot,
  create,
});

export default course;

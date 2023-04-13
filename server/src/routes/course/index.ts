import trpc from "../../trpc";
import availablePeriod from "./availablePeriod";
import count from "./count";
import create from "./create";
import edit from "./edit";
import list from "./list";
import remove from "./remove";
import timeSlot from "./timeSlot";

const course = trpc.router({
  availablePeriod,
  count,
  list,
  timeSlot,
  create,
  remove,
  edit,
});

export default course;

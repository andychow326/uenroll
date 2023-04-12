import trpc from "../../trpc";
import availablePeriod from "./availablePeriod";
import count from "./count";
import list from "./list";

const course = trpc.router({
  availablePeriod,
  count,
  list,
});

export default course;

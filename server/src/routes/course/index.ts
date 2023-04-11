import trpc from "../../trpc";
import count from "./count";
import list from "./list";

const course = trpc.router({
  count,
  list,
});

export default course;

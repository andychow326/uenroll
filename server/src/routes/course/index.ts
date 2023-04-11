import trpc from "../../trpc";
import list from "./list";

const course = trpc.router({
  list,
});

export default course;

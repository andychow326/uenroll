import { exec } from "child_process";

function ResetDatabase() {
  exec(`npx prisma migrate reset --force`);
}

export default ResetDatabase;

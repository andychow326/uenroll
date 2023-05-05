import childProcess from "child_process";
import util from "util";

const exec = util.promisify(childProcess.exec);

async function ResetDatabase() {
  try {
    await exec(`npx prisma migrate reset --force`);
  } catch {
    await exec(`npx prisma migrate dev`);
  }
}

export default ResetDatabase;

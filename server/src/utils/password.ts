import * as argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(
  password: string,
  input: string
): Promise<boolean> {
  return argon2.verify(password, input);
}

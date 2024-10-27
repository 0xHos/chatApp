import bcrypt from "bcrypt";

export default async function checkPassword(
  password: string,
  hash_password: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(password, hash_password);
    return result;
  } catch (err) {
    console.error("Error while checking password", err);
    return false;
  }
}

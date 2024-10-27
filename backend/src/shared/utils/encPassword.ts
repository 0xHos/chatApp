import bcrypt from "bcrypt";

export default async function encrPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    return hash_password;
  } catch (err) {
    console.error("Error while encrypting password", err);
    throw err;
  }
}

import REF from "src/models/ref.model";

export async function generateRefCode() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 10;
  let code = '';

  while (code.length < codeLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    code += randomChar;
  }

  const foundRefs = await REF.find({ refferalID: code });

  if (foundRefs.length > 0) {
    console.log("Code already exists, generating new code...");
    return generateRefCode();
  }

  return code;
}

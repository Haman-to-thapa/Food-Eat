
export const generaVerficationCode = (length = 6) : string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
  let verificationCode = "";
  const characterLength = characters.length;

  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(Math.floor(Math.random() * characterLength))
  }
  return verificationCode;
}
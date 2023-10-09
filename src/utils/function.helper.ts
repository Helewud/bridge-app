export const generateNumberToken = (length: number): string => {
  if (length <= 0 || length > 15) {
    throw new Error("Invalid length. Length should be between 1 and 15.");
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

// Function to remove dashes from a UUID
function removeDashesFromUUID(uuid: string): string {
  return uuid.replace(/-/g, "");
}

// Function to generate a random string of the same length as the UUID
function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

export function generateUniqueIdentifier(userId: string): string {
  const uuidWithoutDashes = removeDashesFromUUID(userId);
  const randomString = generateRandomString(uuidWithoutDashes.length);
  return uuidWithoutDashes + randomString;
}

export function getUserIdFromIdentifier(concatenatedString: string): string {
  const uuidLength = 36; // UUID length with dashes
  const uuidWithoutDashes = concatenatedString.substring(0, uuidLength);
  const parts = [];
  for (let i = 0; i < uuidWithoutDashes.length; i += 8) {
    parts.push(uuidWithoutDashes.substring(i, i + 8));
  }
  return parts.join("-");
}

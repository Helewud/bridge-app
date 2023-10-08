export const generateNumberToken = (length: number): string => {
  if (length <= 0 || length > 15) {
    throw new Error("Invalid length. Length should be between 1 and 15.");
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

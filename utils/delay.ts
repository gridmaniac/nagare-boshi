export const delay = async (value: number) => {
  await new Promise((resolve) => setTimeout(resolve, value));
};

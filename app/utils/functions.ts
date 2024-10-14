export const setName = (name: any) => {
  const [n] = name?.split("@");
  return n;
};

export const setDate = (date: string | undefined) => {
  return date?.split(" ")[0];
};

export const createId = () => {
  let id = null;
  return () => {
    if (id == null) {
      id = 0;
    } else {
      id += 1;
    }
    return id;
  };
};

export const validateFields = (fields: any, types: any) => {
  for (const field in fields) {
    if (!fields[field]) {
      return false;
    }
    if (types[field] && typeof fields[field] !== types[field]) {
      console.log(field);

      return false;
    }
  }
  return true;
};

export const createParam = ({table, rest}) => {
  return {
    "TableName": table,
    "Item": rest,
  };
};

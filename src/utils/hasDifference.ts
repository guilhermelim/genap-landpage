import isEqual from "lodash/isEqual";

const hasDifference = (oldValue: any, newValue: any): boolean => {
  return !isEqual(oldValue, newValue);
};

export default hasDifference;

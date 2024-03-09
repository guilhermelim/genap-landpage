import { useState } from "react";
import isEqual from "lodash/isEqual";

const useCompareState = <T>(initialValue: T): ((newValue: T) => boolean) => {
  const [value, setValue] = useState<T>(initialValue);

  const hasDifference = (newValue: T): boolean => {
    if (!isEqual(value, newValue)) {
      setValue(newValue);
      return true;
    }
    return false;
  };

  return hasDifference;
};

export default useCompareState;

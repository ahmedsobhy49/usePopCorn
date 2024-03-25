import { useState } from "react";

export function useControlledElement(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
}

import { useState, ChangeEvent } from "react";

export const useForm = <T extends Object>(objectInitial: T) => {
  const [object, setObject] = useState(objectInitial);

  const doubleLink = ({ target }: ChangeEvent<any>) => {
    const { name, value } = target;
    setObject({
      ...object,
      [name]: value,
    });
  };

  return {
    object,
    doubleLink,
    ...object,
  };
};
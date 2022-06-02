import { useState } from "react";

export const usePersistHook = (userAuth: object) => {
  const [user, setUser] = useState({});

  if (Object.keys(userAuth).length !== 0) {
    setUser({ name: userAuth });
  }

  return user;
};

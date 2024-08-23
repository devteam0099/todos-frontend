import { createContext, useContext } from "react";
export const data = createContext();
export const DataProvider = data.Provider;

export default function useData() {
  return useContext(data);
}

import { createContext } from "react";
const ScrollPosContext = createContext<[any, (pos: any) => void]>([
  "",
  () => {},
]);

export default ScrollPosContext;

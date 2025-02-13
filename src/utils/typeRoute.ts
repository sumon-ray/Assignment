import { ReactNode } from "react";

export type TRouter = {
  name?: string;
  path: string;
  element?: ReactNode;
};

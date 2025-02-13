import { TRouter } from "../utils/typeRoute";

export const boardRoute = (route: TRouter[]): TRouter[] => {
  const routes: TRouter[] = route.map((item) => {
    return {
      path: item.path,
      name: item.name,
    };
  });
  return routes;
};

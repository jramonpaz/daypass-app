export interface INavigationState {
  index: number;
  key: string;
  routeNames: string[];
  routes: INavigationRoute[] | any;
  stale: boolean;
  type: string;
}

export interface INavigationRoute {
  key: string
  name: string
  params: string
}

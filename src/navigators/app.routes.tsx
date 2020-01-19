import { NAV_HOME, NAV_LOCATION_TYPE } from 'src/constants/routes.constants';

export const APP_ROUTES = [
  {
    title: 'Home',
    screen: NAV_HOME,
  },
  {
    title: 'Location type',
    screen: NAV_LOCATION_TYPE,
  },
];

export type AppRoutes = typeof APP_ROUTES;

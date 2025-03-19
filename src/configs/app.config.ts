import { LayoutTypes } from "@/@types/layout";

export type AppConfig = {
  apiPrefix: string
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  enableMock: boolean
  locale: string
  layoutType: LayoutTypes,
}

const appConfig: AppConfig = {
  layoutType: LayoutTypes.SimpleSideBar,
  apiPrefix: 'api/v1',
  authenticatedEntryPath: '/dashboard',
  unAuthenticatedEntryPath: '/sign-in',
  enableMock: false,
  locale: 'ru',
}

export default appConfig

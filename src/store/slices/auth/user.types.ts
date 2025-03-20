import { BrowserDataContent } from '@/@types/Client Types/BrowserTypes';
import { TPaginationSort } from '@/utils/encodingUtils';

//Глобал Стейт пользователь плюс меню
export interface UserState {
  token?: string;
  uuid?: string;
  role?: string;
  username?: string;
  menu?: MenuData[];
}

// меню
export interface MenuData {
  menuname: string;
  real_name: string;
  visible: boolean;
  idmenu: string;
  menu_item_data: MenuItemData[];
}
// Вложенное меню
export interface MenuItemData {
  idmenu: string;
  caption?: string;
  visible: boolean;
  frametype: number;
  id_object: string;
  order: number;
  sort_by: number;
  idmenuitem: string;
  idmenuitemparent?: string;
  pagination: TPaginationSort | undefined;
  browserParam: BrowserDataContent | undefined;
  isViewer?: boolean;
}

export type UMenuItemData<T = {}> = MenuItemData &
  (T extends { additional_info: infer A } ? { additional_info: A } : {});

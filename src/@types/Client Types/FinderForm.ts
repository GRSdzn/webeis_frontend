import { TPaginationSort } from '@/utils/encodingUtils';
import { ExtraFieldFirst, ExtraFieldSecond } from './CardViewTypes';
import { User } from './UserInResponse';

// Основной интерфейс для всего объекта
export interface FinderFormResponse {
  data: FinderFormAllData;
  user: User;
}

export interface FinderFormAllData {
  object_info: FinderInfo;
  object_data: any;
  object_type: number;
  extra_field_first: ExtraFieldFirst[];
  extra_field_second: ExtraFieldSecond[];
  pagination?: TPaginationSort;
}

// Интерфейс для объекта object_info
export interface FinderInfo {
  browsername: string | null;
  browsercaption: string | null;
  browserheight: number | null;
  browserwidth: number | null;
  idbrowserheader: string | null;
  idmenu: string | null;
  menuwidth: number | null;
  modifydate: string | null; // Можно использовать Date, если формат даты известен
  idis: string | null;
  viewerlayout: string | null;
  toolbarvisible: boolean | null;
  data: any | null; // Тип данных не определен
  standartitemstoolbargroupingmode: string | null;
  finder_name: string;
  idbrowser: string;
  finder_param: FinderParam[];
}

// Интерфейс для элементов массива finder_param
interface FinderParam {
  idfinder: string;
  finderparameterorder: number;
  finderparametername: string;
  finderparametercaption: string;
  finderparametertype: string;
  required: boolean;
}

// types/ResponseData.ts (или в вашем @/types/client.ts)

import {
  BrowserAllData,
  BrowserConfig,
  BrowserDataContent,
} from '@/@types/Client Types/BrowserTypes';
import { CardInfo, CardData, CardAllData } from '@/@types/Client Types/CardTypes';
import { FinderFormAllData, FinderInfo } from '@/@types/Client Types/FinderForm';
import {
  CardViewData,
  CardViewInfo,
  ExtraFieldFirst,
  ExtraFieldSecond,
} from './Client Types/CardViewTypes';
import { User } from './Client Types/UserInResponse';
import { TPaginationSort } from '@/utils/encodingUtils';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface ObjectOpenResponse {
  data: BrowserAllData | CardAllData | FinderFormAllData;
  finder: FinderFormAllData;
  user: User;
}
export interface ServerObject {
  object_type: number;
  object_info: any;
  object_data: any;
  pagination?: TPaginationSort;
  extra_field_first?: any;
  extra_field_second?: any;
}
export type ResponseData = {
  config: BrowserConfig[] | CardInfo[] | CardViewInfo[] | FinderInfo;
  data: BrowserDataContent[] | CardData[] | CardViewData[] | FinderInfo;
  type: number;
  extra_field_first: ExtraFieldFirst[];
  extra_field_second: ExtraFieldSecond[];
  pagination?: TPaginationSort;
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseData[], Error>>;
};

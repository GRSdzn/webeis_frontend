import { TPaginationSort } from '@/utils/encodingUtils';

export interface ServerObject {
  object_type: number;
  object_info: any;
  object_data: any;
  extra_field_first?: any;
  extra_field_second?: any;
  pagination?: TPaginationSort;
}

export interface ServerResponse {
  finder?: ServerObject | null;
  data?: ServerObject;
  user?: any;
}

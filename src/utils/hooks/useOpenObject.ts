import { ResponseData, ObjectOpenResponse } from '@/@types/client';
import { TPaginationSort } from '@/utils/encodingUtils';
import { ClientService } from '@/services/client/client.service';

export function useOpenObject(
  idObject: string | null,
  frametype: number | '0',
  p_param?: any,
  pagination?: TPaginationSort
) {
  const open = async (): Promise<ResponseData[]> => {
    let resp: ObjectOpenResponse;
    if (frametype === 13) {
      resp = await ClientService.objectFinder(idObject, frametype, p_param, pagination);
    } else {
      resp = await ClientService.objectOpen(idObject, frametype, p_param, pagination);
    }

    const server = resp;

    const result: ResponseData[] = [];

    if (server.finder) {
      result.push({
        type: server.finder.object_type,
        config: server.finder.object_info,
        data: server.finder.object_data,
        pagination: server.finder.pagination,
        extra_field_first: server.finder.extra_field_first,
        extra_field_second: server.finder.extra_field_second,
      });
    }

    if (server.data) {
      result.push({
        type: server.data.object_type,
        config: server.data.object_info,
        data: server.data.object_data,
        pagination: server.data.pagination,
        extra_field_first: server.data.extra_field_first,
        extra_field_second: server.data.extra_field_second,
      });
    }

    return result;
  };

  return { open };
}

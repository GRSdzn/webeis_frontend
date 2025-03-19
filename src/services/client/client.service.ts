import { ObjectOpenResponse } from '@/@types/client';
import ApiService from '@/services/ApiService';
import { TPaginationSort } from '@/utils/encodingUtils';

export const ClientService = {
  async objectOpen(
    p_id_object: string | null,
    p_frametype: number | '0',
    p_param?: any,
    pagination?: TPaginationSort,
    uuid?: string
  ): Promise<ObjectOpenResponse> {
    const res = await ApiService.fetchData<
      {
        p_id_object: string | null;
        p_frametype: number | '0';
        p_param?: any;
        pagination?: TPaginationSort;
        uuid?: string;
      },
      ObjectOpenResponse
    >({
      url: '/objects/open',
      method: 'POST',
      data: { p_id_object, p_frametype, p_param, pagination, uuid },
    });
    return res.data;
  },

  async objectFinder(
    p_id_object: string | null,
    p_frametype: number | '0',
    p_param?: any,
    pagination?: TPaginationSort,
    uuid?: string
  ): Promise<ObjectOpenResponse> {
    const res = await ApiService.fetchData<
      {
        p_id_object: string | null;
        p_frametype: number | '0';
        p_param?: any;
        pagination?: TPaginationSort;
        uuid?: string;
      },
      ObjectOpenResponse
    >({
      url: '/objects/finder',
      method: 'POST',
      data: { p_id_object, p_frametype, p_param, pagination, uuid },
    });
    return res.data;
  },
};

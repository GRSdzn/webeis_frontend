import { BrowserDataContent } from '@/@types/Client Types/BrowserTypes';
import { CardViewMenuItemData } from '@/@types/Client Types/CardViewTypes';
import { MenuItemData, UMenuItemData } from '@/store/slices/auth/user.types';

import LZString from 'lz-string';

/**
 * Кодирует объект в base64url с LZString-сжатием.
 * @param item - Объект для кодирования.
 * @returns Строка base64url.
 */

export type TPaginationSort = {
  limit: number;
  page: number;
  object_data_total?: number;
  sort_by?: string;
  order?: string;
};

export const encodeMenuItem = (item: any, params?: any, pagination?: TPaginationSort): string => {
  // Extract pagination from item if it exists
  const itemPagination = item.pagination;

  // Use pagination from the separate parameter if provided, otherwise use the one from the item
  const paginationToUse = pagination || itemPagination;

  // Combine item, params, and pagination into a single object
  const obj = {
    ...item,
    browserParam: params,
    pagination: paginationToUse,
  };

  // Remove null and undefined values (but keep empty objects)
  const cleanObj = JSON.parse(
    JSON.stringify(obj, (_, v) => (v === null || v === undefined ? undefined : v))
  );

  // Compress JSON string with LZString and encode to base64url
  const compressed = LZString.compressToBase64(JSON.stringify(cleanObj));

  // Convert to base64url (replace + and /, remove =)
  return compressed.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Декодирует строку base64url обратно в объект.
 * @param encodedItem - Строка base64url.
 * @returns Декодированный объект или null в случае ошибки.
 */
export const decodeMenuItem = (encodedItem: string): UMenuItemData | null => {
  try {
    // Преобразуем base64url обратно в base64
    const base64 = encodedItem.replace(/-/g, '+').replace(/_/g, '/');

    // Декодируем и разжимаем
    const jsonString = LZString.decompressFromBase64(base64);
    return jsonString ? JSON.parse(jsonString) : null;

  } catch (error) {
    console.error('Ошибка при декодировании:', error);
    return null;
  }
};

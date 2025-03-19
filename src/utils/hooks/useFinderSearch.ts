// // useFinderSearch.ts
// import { useState } from 'react';
// import { ClientService } from '@/services/client/client.service';

// /**
//  * Универсальный хук для поиска,
//  * возвращающий массив результатов произвольного типа T.
//  */
// function useFinderSearch<T = any>(
//   idbrowser: string,
//   frametype: number | '0' = '0',
//   initialParam: Record<string, unknown> = {}
// ) {
//   const [results, setResults] = useState<T[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /**
//    * Выполняем запрос на сервер
//    * @param p_param - параметры поиска
//    */
//   const search = async (p_param?: Record<string, unknown>) => {
//     setLoading(true);
//     setError(null);
//     setResults(null);

//     try {
//       // Вызываем finderSearch
//       const resp = await ClientService.finderSearch(idbrowser, p_param || initialParam, frametype);
//       const { data } = resp;

//       // Предположим, что сервер возвращает data.object_data
//       // как массив искомых объектов.
//       // Тогда тип: T[] | undefined
//       const found = (data.object_data as T[]) || [];

//       // сохраняем в results
//       setResults(found);
//     } catch (err: any) {
//       console.error('Ошибка при поиске:', err);
//       setError(err.message || 'Ошибка при поиске');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     search,
//     results,
//     loading,
//     error,
//   };
// }

// export default useFinderSearch;

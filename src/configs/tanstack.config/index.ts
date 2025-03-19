import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Глобальные настройки: можно настроить retry, refetch и т.д.
      // refetchOnWindowFocus: false,
      // staleTime: 60000, // 1 минута
    },
  },
});

import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { decodeMenuItem } from '@/utils/encodingUtils';
import { useOpenObject } from './useOpenObject';
import { ResponseData } from '@/@types/client';

export function useObjectGenerator() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const paramsCustom = searchParams.get('data');
  const allParams = paramsCustom ? decodeMenuItem(paramsCustom) : null;

  const currentObjectID = params.object ?? '';
  const currentFrametype = allParams?.frametype || 0;
  const currentBrowserParam = allParams?.browserParam;
  const currentPagination = allParams?.pagination;
  const isViewer = allParams?.isViewer;
  const order = allParams?.order;
  const sort_by = allParams?.sort_by;
  console.log('allParams', allParams); // здесь pagination верный
  const { open } = useOpenObject(
    currentObjectID,
    currentFrametype,
    currentBrowserParam,
    currentPagination,
    isViewer
  );

  const queryKey = [
    'objectGenerator',
    currentObjectID,
    currentFrametype,
    JSON.stringify(currentBrowserParam),
    currentPagination?.page,
    currentPagination?.limit,
    currentPagination?.sort_by,
    currentPagination?.order,
  ];

  const {
    data: responseArray,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ResponseData[]>({
    queryKey,
    queryFn: open,
    refetchOnWindowFocus: false,
  });

  let errorMessage: string | null = null;
  if (isError) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error';
  }

  return {
    params,
    responseArray,
    loading: isLoading,
    error: errorMessage,
    refetch,
  };
}

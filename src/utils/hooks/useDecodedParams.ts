import { useParams, useSearchParams } from 'react-router-dom';
import { decodeMenuItem } from '@/utils/encodingUtils';

export function useDecodedParams() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const paramFromUrl = searchParams.get('data');
  const decoded = paramFromUrl ? decodeMenuItem(paramFromUrl) : null;

  return {
    objectId: params.object ?? '',
    framytype: decoded?.frametype || 0,
    browserParam: decoded?.browserParam,
    allParams: decoded,
  };
}

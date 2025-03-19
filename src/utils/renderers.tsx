import BrowserSimpleTable from '@/components/Browsers/BrowserSimpleTable.ui';
import CardView from '@/components/Browsers/CardView.ui';
import Finder from '@/components/Browsers/Finder.ui';

import { BrowserDataContent, BrowserConfig } from '@/@types/Client Types/BrowserTypes';
import { CardData, CardInfo } from '@/@types/Client Types/CardTypes';
import {
  CardViewData,
  CardViewInfo,
  ExtraFieldFirst,
  ExtraFieldSecond,
} from '@/@types/Client Types/CardViewTypes';
import { FinderInfo } from '@/@types/Client Types/FinderForm';
import { ContextBrowserInfo } from '@/components/Browsers/BrowserInfo.ui';
import { TPaginationSort } from './encodingUtils';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { ResponseData } from '@/@types/client';

// Dictionary where the key is the type, and the value is a function that returns the necessary React element
export const renderByType: Record<number, (props: ResponseData) => JSX.Element> = {
  1: ({ data, config, pagination, refetch }) => (
    <BrowserSimpleTable
      pagination={pagination as TPaginationSort}
      data={data as BrowserDataContent[]}
      info={config as BrowserConfig[]}
      refetch={
        refetch as (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseData[], Error>>
      }
    />
  ),

  2: ({ data, config }) => (
    <ContextBrowserInfo data={data as CardData[]} info={config as CardInfo[]} />
  ),

  3: ({ data, config, extra_field_first, extra_field_second, type }) => (
    <>
      <CardView
        data={data as CardViewData[]}
        info={config as CardViewInfo[]}
        type={type}
        extraFirst={extra_field_first as ExtraFieldFirst[]}
        extraSecond={extra_field_second as ExtraFieldSecond[]}
      />
    </>
  ),

  4: ({ config }) => <Finder info={config as FinderInfo} />,
};

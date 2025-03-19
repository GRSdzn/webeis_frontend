import React from 'react';
import { Flex, Title } from '@mantine/core';
import MenuItemTable from './MenuItemTable';
import ExtraFieldTable from './ExtraField';
import {
  CardViewData,
  CardViewInfo,
  ExtraFieldFirst,
  ExtraFieldSecond,
} from '@/@types/Client Types/CardViewTypes';

type CardViewProps = {
  info: CardViewInfo[];
  data: CardViewData[];
  extraFirst: ExtraFieldFirst[];
  extraSecond: ExtraFieldSecond[];
  type: number;
};

const CardView: React.FC<CardViewProps> = ({ info, data, extraFirst, extraSecond, type }) => {
  const cardConfig = info?.[0];
  const cardData = data?.[0];

  // console.log('info', info);
  // console.log('data', data);
  // console.log('extraFirst', extraFirst);
  // console.log('extraSecond', extraSecond);

  // 1) Пример: проверяем, есть ли browsercaption (значит, это BrowserConfig)
  let title = '';
  if (cardConfig && 'browsercaption' in cardConfig) {
    title = cardConfig.browsercaption ?? '';
  }
  // иначе, если это CardInfo — поля browsercaption нет

  // 2) Проверяем menu_item_data (значит, это BrowserDataContent)
  let menuItems = null;
  if (cardData && 'menu_item_data' in cardData && cardData.menu_item_data) {
    menuItems = cardData.menu_item_data;
  }

  // console.log(cardConfig);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        justifyContent: 'space-between',
      }}
    >
      <Title order={2}>{cardData != null ? cardData.real_name : 'Таблица'}</Title>
      <Flex w={'100%'} direction={'row'} justify={'space-between'}>
        {menuItems && <MenuItemTable menuItems={menuItems} type={type} />}
        <ExtraFieldTable fieldsFirst={extraFirst} fieldsSecond={extraSecond} />
      </Flex>
    </div>
  );
};

export default CardView;

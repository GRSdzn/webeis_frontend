import React, { useContext } from 'react';
import { Text, Box, Card, Stack, Input } from '@mantine/core';
import {
  DynamicContextValue,
  withDynamicContext,
  WrappedComponentProps,
} from '../HOC/withDynamicContext';
import { CardData, CardInfo } from '@/@types/Client Types/CardTypes';

type BrowserSimpleTableProps = {
  data: CardData[];
  info: CardInfo[];
};

export const BrowserInfo: React.FC<WrappedComponentProps<BrowserSimpleTableProps>> = ({
  data,
  info,
  DynamicContext,
}) => {
  if (!info || !data) {
    return <Text>Данные не загружены</Text>;
  }

  //TODO: ядерный костыль на работу компонента как обычно, без ХОКа
  const ctx = DynamicContext ? useContext(DynamicContext) : undefined;

  // Группировка info по idbrowsercolumn_parent
  const groupedInfo: Record<string, CardInfo[]> = {};
  info
    .filter((item) => item.browsercolumnvisible)
    .forEach((item) => {
      const parentId = item.idbrowsercolumn_parent || 'root';
      if (!groupedInfo[parentId]) {
        groupedInfo[parentId] = [];
      }
      groupedInfo[parentId].push(item);
    });
  // console.log('ctx', ctx);
  // Функция для получения значения поля из данных
  const getFieldValue = (fieldName: string, cardData: CardData) => {
    return cardData[fieldName as keyof CardData] || ' ';
  };

  // Рекурсивная функция рендера карточек
  const renderCards = (parentId: string) => {
    return groupedInfo[parentId]?.map((infoItem) => (
      <Card key={infoItem.idbrowsercolumn}>
        <Text fw="bold">{infoItem.browsercolumncaption}</Text>
        {groupedInfo[infoItem.idbrowsercolumn] && (
          <Box mt="sm" pl="md" style={{ borderLeft: '2px solid #ccc' }}>
            {renderCards(infoItem.idbrowsercolumn)}
          </Box>
        )}
        {!groupedInfo[infoItem.idbrowsercolumn] && (
          <Stack>
            {data.map((cardData, index) => (
              <Input
                key={index}
                disabled={true}
                value={getFieldValue(infoItem.browsercolumnname, cardData)}
              />
            ))}
          </Stack>
        )}
      </Card>
    ));
  };

  return <><h2>Браузер Инфо</h2> {renderCards('root')}</>;
};

export const ContextBrowserInfo = withDynamicContext(BrowserInfo, 'BrowserInfoContext');

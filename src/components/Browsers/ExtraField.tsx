import React from 'react';
import { Title, Paper, Stack, ScrollArea, Grid, Text } from '@mantine/core';
import { ExtraFieldFirst, ExtraFieldSecond } from '@/@types/Client Types/CardViewTypes';

type ExtraFieldTableProps = {
  fieldsFirst: ExtraFieldFirst[];
  fieldsSecond: ExtraFieldSecond[];
};

const ExtraFieldTable: React.FC<ExtraFieldTableProps> = ({ fieldsFirst, fieldsSecond }) => {
  if (!fieldsFirst || fieldsFirst.length === 0) return null;
  if (!fieldsSecond || fieldsSecond.length === 0) return null;
  // Группировка по idbrowsercolumn_parent
  const groupedFields: Record<number, ExtraFieldFirst[]> = {};
  fieldsFirst.forEach((field) => {
    const parentId = field.idbrowsercolumn_parent ?? 0;
    if (!groupedFields[parentId]) groupedFields[parentId] = [];
    groupedFields[parentId].push(field);
  });

  return (
    <Paper shadow="xs" p="md" radius="md">
      <Stack>
        <Title order={3}>Дополнительные данные</Title>
        <ScrollArea>
          {Object.entries(groupedFields).map(([parentId, fields]) => (
            <div key={parentId}>
              {parentId !== '0' && <Title order={4}>Группа {parentId}</Title>}
              <Grid gutter="md">
                {fields
                  .sort((a, b) => (a.y_id ?? 0) - (b.y_id ?? 0) || (a.x_id ?? 0) - (b.x_id ?? 0))
                  .map((field) => (
                    <Grid.Col key={field.idbrowsercolumn} span={6} offset={field.x_id ?? 0}>
                      <Text w={500}>{field.browsercolumncaption}</Text>
                      <Text c="dimmed">
                        {fieldsSecond[0][field.browsercolumnname] || 'Нет данных'}
                      </Text>
                    </Grid.Col>
                  ))}
              </Grid>
            </div>
          ))}
        </ScrollArea>
      </Stack>
    </Paper>
  );
};

export default ExtraFieldTable;

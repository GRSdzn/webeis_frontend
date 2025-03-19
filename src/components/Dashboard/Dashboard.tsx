import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, SimpleGrid, Text, Title, Stack } from '@mantine/core';
import { Charts } from './Charts';
import classes from './Dashboard.module.css';
import { RootState } from '@/store';
import { LayoutTypes } from '@/@types/layout';

interface DashboardProps {
  data?: any[];
}

export function Dashboard({ data = [] }: DashboardProps) {
  const isDarkMode = useSelector((state: RootState) => 
    state.theme.currentLayout === LayoutTypes.CollapsedSideBar
  );

  const cards = useMemo(() => (
    data.map((item, index) => (
      <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>{item.title}</Text>
        <Text size="sm" c="dimmed">
          {item.description}
        </Text>
      </Card>
    ))
  ), [data]);

  return (
    <div className={`${classes.container} ${isDarkMode ? classes.dark : ''}`}>
      <Stack gap="xl">
        <Title order={2} ta="center">Аналитика</Title>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {cards}
        </SimpleGrid>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Charts />
        </Card>
      </Stack>
    </div>
  );
}
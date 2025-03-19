import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  Select,
  TextInput,
  Group,
  Pagination,
  Center,
  Title,
} from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { BrowserDataContent, BrowserConfig } from '@/@types/Client Types/BrowserTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeMenuItem, encodeMenuItem, TPaginationSort } from '@/utils/encodingUtils';
import { ResponseData } from '@/@types/client';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';

type BrowserSimpleTableProps = {
  data: BrowserDataContent[];
  info: BrowserConfig[];
  pagination: TPaginationSort;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseData[], Error>>;
};

const BrowserSimpleTable: React.FC<BrowserSimpleTableProps> = ({
  data,
  info,
  pagination,
  refetch,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Всегда получаем актуальное значение параметров из URL
  const decodedMenuItem = useMemo(() => {
    const paramsCustom = searchParams.get('data');
    return paramsCustom ? decodeMenuItem(paramsCustom) : null;
  }, [searchParams]);

  const [pageSize, setPageSize] = useState<number>(decodedMenuItem?.pagination?.limit || 10);
  const [page, setPage] = useState<number>(decodedMenuItem?.pagination?.page || 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<BrowserDataContent>>({
    columnAccessor: decodedMenuItem?.pagination?.sort_by || '',
    // Приводим значение к "asc" или "desc"
    direction: decodedMenuItem?.pagination?.order === 'desc' ? 'desc' : 'asc',
  });

  const tableConfig = info.length > 0 ? info[0] : null;
  const columns = (tableConfig?.col_json ?? []).filter((col) => col.browsercolumnvisible);

  useEffect(() => {
    document.title = info[0]?.browsercaption || 'Таблица';
  }, [info]);

  // Обновляем page, pageSize и sortStatus при изменении URL
  useEffect(() => {
    setPage(decodedMenuItem?.pagination?.page || 1);
    setPageSize(decodedMenuItem?.pagination?.limit || 10);
    if (decodedMenuItem?.pagination?.sort_by && decodedMenuItem?.pagination?.order) {
      setSortStatus({
        columnAccessor: decodedMenuItem.pagination.sort_by,
        direction: decodedMenuItem.pagination.order === 'desc' ? 'desc' : 'asc',
      });
    }
  }, [decodedMenuItem]);

  const filteredData = useMemo(
    () =>
      (data ?? []).filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      ),
    [data, searchQuery]
  );

  // Клиентская сортировка (для мгновенного отображения)
  const sortedData = useMemo(() => {
    if (sortStatus.columnAccessor) {
      return [...filteredData].sort((a, b) => {
        const valA = a[sortStatus.columnAccessor];
        const valB = b[sortStatus.columnAccessor];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortStatus.direction === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortStatus.direction === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortStatus]);

  const paginatedData = sortedData.slice(0, pageSize);

  // Функция обновления параметров в URL, включая сортировку
  const updatePaginationAndFetch = (
    newPage: number,
    newLimit: number,
    newSortStatus?: DataTableSortStatus<BrowserDataContent>
  ) => {
    const updatedPagination = {
      page: newPage,
      limit: newLimit,
      ...(newSortStatus?.columnAccessor
        ? {
            sort_by: newSortStatus.columnAccessor,
            order: newSortStatus.direction,
          }
        : {}),
    };

    const updatedParams = {
      ...decodedMenuItem,
      pagination: updatedPagination,
    };

    const encodedItem = encodeMenuItem(updatedParams, decodedMenuItem?.browserParam);
    navigate(`?data=${encodedItem}`, { replace: true });
    // Родительский запрос (например, через useQuery) должен отреагировать на изменение URL
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updatePaginationAndFetch(newPage, pageSize, sortStatus);
  };

  const handlePageSizeChange = (value: string | null) => {
    if (!value) return;
    const newLimit = parseInt(value);
    setPageSize(newLimit);
    setPage(1);
    updatePaginationAndFetch(1, newLimit, sortStatus);
  };

  // Обработчик изменения статуса сортировки при клике на заголовок столбца
  const handleSortStatusChange = (newSortStatus: DataTableSortStatus<BrowserDataContent>) => {
    setSortStatus(newSortStatus);
    updatePaginationAndFetch(page, pageSize, newSortStatus);
  };

  const onRowClick = (record: BrowserDataContent) => {
    const id_viewer = info[0].id_viewer;
    if (!id_viewer) return;

    const paginationForRowClick = {
      page: 1,
      limit: 10,
    };
    const idPonDoubleClickWithRecord = {
      ...record,
      idbpondoubleclick: info[0]?.idbpondoubleclick,
    };
    const decompData = {
      frametype: 0,
    };
    const encodedItem = encodeMenuItem(
      decompData,
      idPonDoubleClickWithRecord,
      paginationForRowClick
    );
    navigate(`/client/${id_viewer}?data=${encodedItem}`);
  };

  return (
    <>
      <Title order={2}>{tableConfig?.browsercaption || 'Таблица'}</Title>
      <Flex
        direction="column"
        gap="sm"
        p="md"
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          background: 'white',
          maxWidth: '100%',
        }}
      >
        {/* Панель с поиском и выбором размера страницы */}
        <Group mb="sm">
          <TextInput
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            data={['1', '2', '10', '20', '50', '100']}
            style={{ width: 100 }}
          />
        </Group>

        <Box mb="xl">
          {paginatedData.length > 0 ? (
            <DataTable<BrowserDataContent>
              columns={columns.map((col) => ({
                accessor: col.browsercolumnname,
                title: col.browsercolumncaption,
                align: col.browsercolumntypealign,
                sortable: true,
              }))}
              records={paginatedData}
              withColumnBorders
              withTableBorder
              sortStatus={sortStatus}
              onSortStatusChange={handleSortStatusChange}
              onRowClick={({ record }) => onRowClick(record)}
            />
          ) : (
            <Text ta="center" c="dimmed">
              Нет данных.
            </Text>
          )}

          <Center>
            <Pagination
              total={Math.ceil((pagination.object_data_total || data.length || 1) / pageSize)}
              value={page}
              onChange={handlePageChange}
              mt="md"
            />
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default BrowserSimpleTable;

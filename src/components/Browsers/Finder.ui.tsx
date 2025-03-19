import React, { useState, useEffect } from 'react';
import {
  Group,
  TextInput,
  Button,
  Box,
  Title,
  Tabs,
  Text,
  Textarea,
  Card,
  Flex,
  Drawer,
} from '@mantine/core';
import { FinderInfo } from '@/@types/Client Types/FinderForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeMenuItem, encodeMenuItem } from '@/utils/encodingUtils';

type FinderFormProps = {
  info: FinderInfo;
};

const Finder: React.FC<FinderFormProps> = ({ info }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [opened, setOpened] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const paramsCustom = searchParams.get('data');
  const decodedMenuItem = paramsCustom ? decodeMenuItem(paramsCustom) : null;
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    const p_param = Object.entries(values)
      .filter(([_, val]) => val !== '')
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as Record<string, unknown>);

    const newDecoded = decodedMenuItem ? { ...decodedMenuItem } : { frametype: 0 };
    const mergedMenuItem = {
      ...newDecoded,
      frametype: 0,
      idbrowser: info.idbrowser,
      browserParam: p_param,
    };

    const encoded = encodeMenuItem(mergedMenuItem, p_param);

    navigate(`/client/${info.idbrowser}?data=${encoded}`);
  };

  const handleClear = () => {
    setValues({});
  };

  return (
    <>
      {/* Кнопка открытия Drawer */}
      <Button onClick={() => setOpened(true)} style={{ float: 'right' }}>
        Открыть поиск
      </Button>

      {/* Finder теперь выезжает сбоку */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Поисковик"
        position="right"
        size="lg"
      >
        <Box p="20px">
          <Flex direction="row" gap="md" align="center" justify="space-between">
            <Title order={2}>{info.finder_name}</Title>
          </Flex>

          <Tabs defaultValue="params">
            <Tabs.List>
              <Tabs.Tab value="params">Параметры поиска</Tabs.Tab>
              <Tabs.Tab value="queries">Запросы</Tabs.Tab>
              <Tabs.Tab value="filters">Доп. фильтр</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="params" pt="xs">
              <form onSubmit={(e) => e.preventDefault()}>
                {info.finder_param.map((param) => (
                  <Group key={param.finderparametername} mt="md">
                    <Text>{param.finderparametercaption}:</Text>
                    <TextInput
                      w="100%"
                      name={param.finderparametername}
                      value={values[param.finderparametername] || ''}
                      onChange={handleChange}
                      required={param.required}
                    />
                  </Group>
                ))}
                <Group mt="xl">
                  <Button onClick={handleSubmit}>Поиск</Button>
                  <Button onClick={handleClear} variant="outline">
                    Очистить
                  </Button>
                </Group>
              </form>
            </Tabs.Panel>

            <Tabs.Panel value="queries" pt="xs">
              <Textarea placeholder="Запросы" minRows={5} />
            </Tabs.Panel>
            <Tabs.Panel value="filters" pt="xs">
              <Textarea placeholder="Доп. фильтр" minRows={5} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Drawer>
    </>
  );
};

export default Finder;

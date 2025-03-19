import { useObjectGenerator } from '@/utils/hooks/useObjectGenerator';
import { renderByType } from '@/utils/renderers';
import ErrorComponent from '@/components/ErrorComponent';
import { Center, Loader, Title } from '@mantine/core';

export default function ObjectGeneratorPage() {
  const { params, responseArray, loading, error, refetch } = useObjectGenerator();

  if (loading) {
    return (
      <Center style={{ minHeight: '100%' }}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <ErrorComponent>{error}</ErrorComponent>;
  }
  console.log(responseArray);
  if (!responseArray || responseArray.length === 0) {
    return <ErrorComponent>Нет данных для отображения.</ErrorComponent>;
  }

  return (
    <div>
      <div>
        <div>
          {responseArray.map((item, index) => {
            const { type, config, data, pagination, extra_field_first, extra_field_second } = item;
            const ComponentToRender = renderByType[type];

            if (!ComponentToRender) {
              return <ErrorComponent key={index}>Неизвестный тип данных: {type}</ErrorComponent>;
            }

            const uniqueKey = `${type}-${pagination?.page}-${pagination?.limit}-${JSON.stringify(data).length}`;

            return (
              <div key={uniqueKey}>
                <Title c={'gray'} order={6}>
                  ID: {params.object || params.internal || 'N/A'} | Тип: {type}
                </Title>
                <ComponentToRender
                  config={config}
                  data={data}
                  pagination={pagination}
                  type={type}
                  extra_field_first={extra_field_first}
                  extra_field_second={extra_field_second}
                  refetch={refetch}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

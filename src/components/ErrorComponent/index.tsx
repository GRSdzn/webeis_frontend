import React, { ReactNode } from 'react';
import { Button, Center, Container, Group, Space, Text, Title } from '@mantine/core';
import classes from './error.module.css';

type Props = {
  children: ReactNode;
};

const ErrorComponent: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Space h={190} />
      <Center className={classes.flex}>
        <Container className={classes.content}>
          <Text size="lg" c="white" fw={'bold'}>
            {children}
          </Text>
          <Group>
            <Button size="md" onClick={() => window.location.reload()}>
              Перезагрузить
            </Button>
          </Group>
        </Container>
      </Center>
    </>
  );
};

export default ErrorComponent;

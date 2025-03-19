import React, { useState } from 'react';
import { Paper, TextInput, PasswordInput, Button, Title, Text } from '@mantine/core';
import classes from './SignIn.module.css';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import useAuth from '@/utils/hooks/useAuth';

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const schema = yup.object().shape({
    username: yup.string().required('Пожалуйста, введите имя'),
    password: yup.string().required('Пожалуйста, введите пароль'),
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: Record<string, any>) {
    setLoading(true);
    try {
      const { username, password } = values;
      const res = await signIn({ username, password });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              Добро пожаловать
            </Title>
            <TextInput
              {...form.getInputProps('username')}
              name={'username'}
              label="Логин"
              withAsterisk
              placeholder="Ваш логин"
              size="md"
            />
            <PasswordInput
              {...form.getInputProps('password')}
              name={'password'}
              label="Пароль"
              placeholder="Ваш пароль"
              mt="md"
              size="md"
            />
            <Button loading={loading} type={'submit'} fullWidth mt="xl" size="md">
              Войти
            </Button>
          </Paper>
        </div>
      </form>
    </div>
  );
}

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Layout } from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { modalsList } from './components/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './configs/tanstack.config';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <ModalsProvider modals={modalsList}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Layout />
              </PersistGate>
            </Provider>
          </ModalsProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

/**
 * WhatsApp Clone
 *
 * @format
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ServiceProvider } from './src/composition/ServiceProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1 } },
      }),
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <QueryClientProvider client={queryClient}>
        <ServiceProvider>
          <RootNavigator />
        </ServiceProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

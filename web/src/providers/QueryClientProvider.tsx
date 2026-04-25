import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';

export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}

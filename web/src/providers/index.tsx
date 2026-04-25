import { ReactNode } from 'react';

import { QueryClientProvider } from './QueryClientProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}

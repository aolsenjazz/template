import { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

import { QueryClientProvider } from './QueryClientProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}

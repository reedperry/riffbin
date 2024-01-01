import { useSyncExternalStore } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

function isOnClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return isOnClient() ? <>{children}</> : <>{fallback}</>;
}

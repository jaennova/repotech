export const isClient = typeof window !== 'undefined';

export function getWindow(): Window | undefined {
  return isClient ? window : undefined;
}

export function getDocument(): Document | undefined {
  return isClient ? document : undefined;
}
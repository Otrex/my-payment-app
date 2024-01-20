import {StateCreator, StoreMutatorIdentifier} from 'zustand';
import LocalStore from '../../lib/core/LocalStore';

export function log<T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
  config: StateCreator<T, [], Mos>,
) {
  return (set: (data: T) => void, get: () => T, api: any) => {
    return config(
      (...args: any[]) => {
        console.log('  applying', args);
        set(args[0]);
        console.log('  new state', get());
      },
      get,
      api,
    );
  };
}

export function persist<
  T,
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
>(
  config: StateCreator<T, [], Mos>,
  options: {store: LocalStore; fields: string[]},
) {
  return (set: (data: T) => void, get: () => T, api: any) => {
    return config(
      (...args: any[]) => {
        options.store.store(args[0]).then(() => set(args[0]));
      },
      get,
      api,
    );
  };
}

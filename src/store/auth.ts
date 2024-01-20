import {create} from 'zustand';
import api from '../lib/api';
import LocalStore from '../lib/core/LocalStore';
import {log, persist} from './middleware';

export interface IAuthState {
  token?: string;
  installed?: boolean;
}

export interface IAuthActions {
  bootstrap(): Promise<void>;
}

const authLocalStore = new LocalStore<IAuthState>('auth');

// export const useAuthStore = create<IAuthState & IAuthActions>()(set => ({
//   installed: undefined,
//   token: undefined,

//   async setSession(token: string) {
//     api.setToken(token);
//   },

//   async bootstrap() {
//     try {
//       const data = await authLocalStore.get();
//     } catch (error) {}
//   },
// }));

export const useAuthStore = create<IAuthState & IAuthActions>(
  log(
    persist(set => ({
      installed: undefined,
      token: undefined,

      async setSession(token: string) {
        api.setToken(token);
      },

      async bootstrap() {
        try {
          const data = await authLocalStore.get();
          set({
            token: data.token,
            installed: data.installed,
          });
        } catch (error) {}
      },
    })),
  ),
);

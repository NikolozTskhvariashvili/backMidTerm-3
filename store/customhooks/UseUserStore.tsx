import {create} from 'zustand'

interface CreateUser {
  email: string;
  password: string;
  fullName: string;
  image: string;
}

interface CreateUserState {
  createUser: CreateUser;
  setCreateUser: (updater: (prev: CreateUser) => CreateUser) => void;
}

export const useUserStore = create<CreateUserState>((set) => ({
  createUser: {
    email: '',
    password: '',
    fullName: '',
    image: '',
  },
  setCreateUser: (updater) =>
    set((state) => ({
      createUser: updater(state.createUser),
    })),
}));

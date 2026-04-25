import { makeAutoObservable } from 'mobx';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();

import {Dispatch, SetStateAction} from 'react';
import {LoadingState} from '../../dtos/enums';

export default class PayApp {
  private appStateSetter!: Dispatch<SetStateAction<LoadingState>>;

  static init(setAppState: React.Dispatch<React.SetStateAction<LoadingState>>) {
    console.log('Initializing');
    return new PayApp().setAppStateSetter(setAppState);
  }

  setAppStateSetter(setAppState: Dispatch<SetStateAction<LoadingState>>) {
    this.appStateSetter = setAppState;
    return this;
  }

  async install() {
    console.log('Installing');
    this.appStateSetter(() => LoadingState.READY);
    return Promise.resolve();
  }

  async BeforeBootstrap() {
    console.log('Bootstrapping');
    this.appStateSetter(() => LoadingState.INSTALLING);
    return Promise.resolve();
  }

  loadUp() {
    return this;
  }
}

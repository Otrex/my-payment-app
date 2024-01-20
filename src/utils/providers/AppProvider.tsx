/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext} from 'react';
import React from 'react';
import PayApp from '../../lib/core/PaycomApp';
import config from '../../lib/config';

export type AppContextValue = {
  app: PayApp | undefined;
  config: typeof config;
  showTab: boolean;
  setShowTab: (v: boolean) => any;
  register: (v: PayApp) => any;
};

const defaultValue: AppContextValue = {
  app: undefined,
  config: config,
  showTab: true,

  register: (_: PayApp) => {},
  setShowTab: (_: boolean) => {},
};

export const AppContext = createContext(defaultValue);

export const AppProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const [app, setApp] = React.useState<PayApp>();
  const [showTab, setShowTab] = React.useState(true);

  return (
    <AppContext.Provider
      value={{
        ...defaultValue,
        showTab,
        setShowTab: (d: boolean) => setShowTab(() => d),
        app,
        register: (v: PayApp) => {
          setApp(() => v);
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};

export function AppInjector<P extends React.JSX.IntrinsicAttributes>(
  Component: React.FC<P & AppContextValue>,
) {
  return (props => {
    const context = useContext(AppContext);
    return <Component {...context} {...props} />;
  }) as React.FC<P>;
}

export const AppProviderHOC = <P extends React.JSX.IntrinsicAttributes>(
  Component: React.FC<P & AppContextValue>,
) => {
  return (props: any) => (
    <AppProvider>
      <Component {...props} />
    </AppProvider>
  );
};

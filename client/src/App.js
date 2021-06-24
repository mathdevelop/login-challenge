import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/apollo';
import { RecoilRoot } from 'recoil';
import Routes from './routes';
import './App.scss';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Routes />
      </RecoilRoot>
    </ApolloProvider>
  );
}
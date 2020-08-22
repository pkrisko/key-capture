import React from 'react';
import Head from 'next/head';
import { ProvideAuth } from '../providers/auth';
import { ProvideQuizzes } from '../providers/quizzes';
import '../styles/app.css';
import 'react-piano/dist/styles.css';

const App = ({ Component, pageProps }) => (
  <ProvideAuth>
    <ProvideQuizzes>
      <Head>
        <link rel="stylesheet" href="/favicon.ico" />
        <title>Mr. Rand&apos;s Class</title>
      </Head>
      <Component {...pageProps} />
    </ProvideQuizzes>
  </ProvideAuth>
);

export default App;

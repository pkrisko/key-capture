import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { ProvideAuth } from '../providers/auth';
import { ProvideQuizzes } from '../providers/quizzes';
import theme from '../util/theme';

// All stylesheets must be imported here in _app.jsx
import '../styles/app.css';
import '../styles/keyboard.css';
import 'react-piano/dist/styles.css';

const App = ({ Component, pageProps }) => (
  <ProvideAuth>
    <ProvideQuizzes>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Mr. Rand&apos;s Class</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ProvideQuizzes>
  </ProvideAuth>
);

export default App;

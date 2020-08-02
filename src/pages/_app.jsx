import React from 'react';
import Head from 'next/head';
import { ProvideAuth } from '../util/auth';
import '../styles/app.css';
import 'react-piano/dist/styles.css';

const App = ({Component, pageProps}) => (
    <ProvideAuth>
        <Head>
            <link rel="stylesheet" href="/public/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
    </ProvideAuth>
);

export default App;
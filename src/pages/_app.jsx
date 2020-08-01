import React from 'react';
import { ProvideAuth } from '../util/auth';
import '../styles/app.css'

const App = ({Component, pageProps}) => (
    <ProvideAuth>
        <Component {...pageProps} />
    </ProvideAuth>
);

export default App;
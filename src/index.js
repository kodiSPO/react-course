import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import "bootstrap/scss/bootstrap.scss";
import "noty/src/noty.scss";
import "noty/src/themes/mint.scss";

import App from './1/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
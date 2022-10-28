import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "noty/src/noty.scss";
import "noty/src/themes/mint.scss";

// import App from './1/App';
// import App from './2/App';
import App from './3/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
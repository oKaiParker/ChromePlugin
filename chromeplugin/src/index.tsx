import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

chrome.tabs && chrome.tabs.query({
  active: true,
  currentWindow: true
}, (tabs) => {
  // Callback function
  chrome.tabs.sendMessage(
    // Message type
    { type: 'GET_DOM' } as any,
  
    // Current tab ID
    tabs[0].id || 0,
  
    // Callback executed when the content script sends a response
    (response: any) => {
        console.log('app ts resp:', response)  
    })
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
/* react-redux */
import { Provider } from 'react-redux';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

/*
 * Ta sử dụng hàm createStore để tạo store chứa allReducers. 
 * Tiếp theo ta gói <App/> bên trong 1 component hỗ trợ của react-redux là Provider, 
 * nhờ đó tất cả component trong <App/> có thể truy cập được store.
 * thunk de tri hoan viec dispatch => fefch du lieu xong moi dispatch
 */
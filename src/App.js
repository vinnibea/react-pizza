
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Cart } from './pages/Cart';



function App() {

  return (
    <Provider store={store}>
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart></Cart>} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;

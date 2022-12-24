import React from "react";
import Home from './page/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Home/>
    </div>
  );
}

export default App;

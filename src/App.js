import React from 'react';
import Pomodoro from 'components/Pomodoro';
import { Menu } from 'components/menu';
import './App.scss';
// import useLocalStorage from 'hooks/useLocalStorage';
// import { presetListItems } from './enums';
function App() {
  

  return (
    <div className="App">
        <div className="container">
          <Menu />
          <Pomodoro />
        </div>
    </div>
  );
}

export default App;
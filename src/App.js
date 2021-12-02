import React from 'react';
import Pomodoro from './components/Pomodoro';
import Menu from './components/displays/Menu';

import './App.scss';

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
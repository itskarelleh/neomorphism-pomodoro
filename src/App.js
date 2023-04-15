import React from 'react';
import Pomodoro from 'components/Pomodoro';
import { Menu } from 'components/menu';
import './App.scss';
import { PomodoroProvider } from './context/PomodoroProvider';

function App() {
  
  return (
    <PomodoroProvider>
      <div className="App">
          <div className="container">
            <Menu />
            <Pomodoro />
          </div>
      </div>
    </PomodoroProvider>
  );
}

export default App;
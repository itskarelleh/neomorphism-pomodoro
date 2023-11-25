import './App.scss'
import Pomodoro from './components/Pomodoro';
import { Menu } from './components/menu';
import './App.scss';
import { PomodoroProvider } from './context/PomodoroProvider';
import { presetListItems } from './enums.ts';
function App() {

  return (
      <PomodoroProvider>
          <div className="App">
              <div className="container">
                  <Menu tasks={presetListItems} />
                  <Pomodoro />
              </div>
          </div>
      </PomodoroProvider>
  )
}

export default App

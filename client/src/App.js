import { Router } from '@reach/router';
import './App.css';
import AddPlayerForm from './components/AddPlayerForm';
import AllPlayers from './components/AllPlayers';
import EditPlayerForm from './components/EditPlayerForm';
import GameSchedule from './components/GameSchedule';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path= "/"/>
        <AllPlayers path = "/players"/>
        <AddPlayerForm path = "/players/add"/>
        <EditPlayerForm path = "players/add/:id"/>
        <GameSchedule path = "schedule/edit"/>
      </Router>
    </div>
  );
}

export default App;

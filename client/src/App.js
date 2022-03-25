import { Router } from '@reach/router';
import './App.css';
import AddPlayerForm from './components/AddPlayerForm';
import AllPlayers from './components/AllPlayers';
import EditPlayerForm from './components/EditPlayerForm';
import GameSchedule from './components/GameSchedule';
import Main from './components/Main';
import ShowGame from './components/ShowGame';
import ShowPlayer from './components/ShowPlayer';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path= "/"/>
        <AllPlayers path = "/players"/>
        <AddPlayerForm path = "/players/add"/>
        <EditPlayerForm path = "players/edit/:id"/>
        <GameSchedule path = "schedule/edit"/>
        <ShowPlayer path = "players/:id"/>
        <ShowGame path = "schedule/:id"/>
      </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import RecipeListView from './Components/RecipeListView'
import RecipeFullView from './Components/RecipeFullView';

function App() {
  return (
    <div className="App">
      <RecipeListView />
      <RecipeFullView />
      
    </div>
  );
}

export default App;

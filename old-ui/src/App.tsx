import './App.css';
import NavBar from './components/NavBar/NavBar';
import { TweetList } from './components/TweetList';
import { TweetPrompt } from './components/TweetPrompt';

function App() {
  return (<div className='container mx-auto'>
    <NavBar />
    <TweetPrompt />
    <TweetList />
  </div>)
}

export default App;

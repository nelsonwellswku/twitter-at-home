import './App.css';
import { TweetList } from './components/TweetList';
import { TweetPrompt } from './components/TweetPrompt';

function App() {
  return (<div className='container mx-auto'>
    <h1 className='text-3xl pb-1'>Twitter At Home 🏠</h1>
    <TweetPrompt />
    <TweetList />
  </div>)
}

export default App;

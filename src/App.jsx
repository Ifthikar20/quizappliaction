import './App.css'
import Quiz  from './components/quiz/Quiz.jsx';
import {jsQuizz} from './constants'
function App() {
 

  return <Quiz questions={jsQuizz.questions}/>;
  
}

export default App

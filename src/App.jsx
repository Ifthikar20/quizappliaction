import './App.css'
import Quiz  from './components/quiz/Quiz.jsx';
import {jsQuizz} from './constants'
function App() {
  
  
  //Lets make an API call to get the list of full questions
  
  
  return <Quiz questions={jsQuizz.questions}/>;
  
}

export default App

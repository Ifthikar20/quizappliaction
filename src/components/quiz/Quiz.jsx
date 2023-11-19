import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss"

const quiz=({ questions })=>{
  const[CurrentQuestion, setCurrentQuestion]= useState(0);
  const [answerindex, setAnswerIndex]=useState(null);
  const [answer, setAnswer]=useState(null);
  const [result, setresult]=useState(resultInitialState);
  const [showResult, setshowResult]=useState(false);

  const{question, choices, correctAnswer} = questions[CurrentQuestion];
  const onAnswerClick=(answer,index)=>{
   setAnswerIndex(index);
   if(answer==correctAnswer){
     setAnswer(true);
   }else{
    setAnswer(false);
   }
  };
  const onClickNext=()=>{
    setAnswerIndex(null);
    setresult((prev)=>answer? {...prev, score: prev.score+5, correctAnswer:prev.correctAnswer+1,}:{
      ...prev, wrongAnswer: prev.wrongAnswer+1,
    });
    if(CurrentQuestion!== questions.length-1){
      setCurrentQuestion((prev)=>prev+1);
    }else{
      setCurrentQuestion(0);
      setshowResult(true);
    }

  };

  const onTryAgain=()=>{
  setresult(resultInitialState);
  setshowResult(false);
  };
  
    return <div className="quiz-container">
    {!showResult?( <>
             <span className="active-questions-no">{CurrentQuestion + 1}</span>
             <span className="total-questions-no">/{questions.length}</span>
             <h2>{question}</h2>
             <ul>
              {
                choices.map((answer, index)=>(
                  <li key={answer} onClick={()=> onAnswerClick(answer, index)} className={answerindex==index?"selected-answer": null}>
                    {answer}
                  </li>
                ))
              }
             </ul>
             <div className="footer">
              <button onClick={onClickNext} disabled={answerindex===null}>
                {CurrentQuestion===questions.length-1? "Finish": "Next"}
              </button>
             </div>
            </>): 
            <div className="result">
             <h3>result</h3>
             <p>
              Total questions: <span>{questions.length}</span>
             </p>
             <p>
              Total scores: <span>{result.score}</span>
             </p>
             <p>
              Correct answers: <span>{result.correctAnswer}</span>
             </p>
             <p>
              Wrong answers: <span>{result.wrongAnswer}</span>
             </p>
                <button onClick={onTryAgain}>Try again</button>
               </div>}
           
        </div>;

    
}

export default quiz;
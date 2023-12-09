import { useState, useEffect } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";
import AnswerTimer from "../answerTimer/answerTimer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//The Url to get customer Data
const URL = "http://localhost:3000/questions";

const quiz = ({ questions }) => {
  const [CurrentQuestion, setCurrentQuestion] = useState(0);
  const [answerindex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setresult] = useState(resultInitialState);
  const [showResult, setshowResult] = useState(false);
  const [optionsFromApi, setoptionsfromApi] = useState([]);
  const [questionsTitleFromApi, setquestionsTitleFromApi] = useState([]);
  const [optionListFromApi, setoptionListFromApi] = useState([]);
  const [fullquestionListFromApi, setfullquestionListFromApi] = useState([]);

  // function getQuestion(){
  //   fetch("http://localhost:3000/questions").then((response)=>response.getQuestion.json())
  //   .then((data)=>
  //   console.log(data)
  //   );
  // }

  const getQuestion = async () => {
    try {
      const res = await fetch("http://localhost:3000/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setoptionsfromApi(data[0].options);
        //counting the number of object in the array and counting from index 1
        console.log("The full ",data);

        for (let i = 0; i < data.length; i++) {
          console.log("Printing the data",data[i]);
           let fullDataTurnedtoArray = Object.values(data[i]);
           let fullDataTurnedtoArrayQuestionTitle = Object.values(data[i]).slice(1, 2).toString();
           console.log("the title",fullDataTurnedtoArrayQuestionTitle);
           setfullquestionListFromApi(fullDataTurnedtoArrayQuestionTitle);
           

          data[i].options.forEach((options) => {
            console.log("Printing options", options);
            let optionsTurnedtoArray = Object.values(options).slice(1);
            setoptionListFromApi(optionsTurnedtoArray);
          });


        }

        //   setquestionsTitleFromApi(data[i]);

        console.log("Full list of optionlistfrom api", optionListFromApi);
      } else {
        console.log("Error fetching cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const { question, options, correctAnswer } = questions[CurrentQuestion];
  console.log("LOGGING question/OPTIONS/CORRECTANSWER", typeof question, options, correctAnswer);
  //const {question, options, correctAnswer} = fullquestionListFromApi[CurrentQuestion];
  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    if (answer == correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  //The question scoring mechanism is mentioned here
  const onClickNext = () => {
    setAnswerIndex(null);
    setresult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );
    if (CurrentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setshowResult(true);
    }
  };

  const onTryAgain = () => {
    setresult(resultInitialState);
    setshowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <AnswerTimer />
          <span className="active-questions-no">{CurrentQuestion + 1}</span>
          <span className="total-questions-no">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {optionListFromApi.map((answer, index) => (
              <li
                key={answer}
                onClick={() => onAnswerClick(answer, index)}
                className={answerindex == index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>

          <div className="footer">
            <button onClick={onClickNext} disabled={answerindex === null}>
              {CurrentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default quiz;

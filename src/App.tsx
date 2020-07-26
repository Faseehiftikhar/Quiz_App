import React from 'react';
import {useState} from 'react';
import QuestionCard from './Components/QuestionCard';
import {fetchQuestions,Difficulty,QuestionState} from './Api'
import { GlobalStyle, Wrapper } from './App.styles';


const TOTAL_QUESTIONS=10

type AnswerObject ={
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;

}

function App() {

  const [loading,setLoading]=useState(false);

  const [questions,setQuestions]=useState<QuestionState[]>([]);

  const [number,setNumber]=useState(0);

  const [userAnswer,setUserAnswer]= useState<AnswerObject[]>([]);

  const [score,setScore]= useState(0);


  const [gameOver,setGameOver]=useState(true);



  const startQuiz=async()=>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }


  const CheckAnswer=(e: React.MouseEvent<HTMLButtonElement>) =>{ if (!gameOver) {
    const answer = e.currentTarget.value;

    const correct = questions[number].correct_answer===answer;

    if (correct) setScore ( prev=>prev ++)

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }

    setUserAnswer(prev => [...prev, answerObject])
  }
};

const nextQuestion=async()=>{
    
  const nextQuestion = number + 1;

  if (nextQuestion === TOTAL_QUESTIONS) {
    setGameOver(true);
  }
  else {
    setNumber(nextQuestion);
  }
};


  
  



  return (

    
    <>
    <GlobalStyle />
    <Wrapper> <h1>QUIZ</h1>
  {gameOver || userAnswer.length===TOTAL_QUESTIONS?(
  <button className='start' onClick={startQuiz}>Let's Start</button>) : null
   }
{!gameOver?(<p className='score'>  score: {score} </p>) : null
 
 }
  {loading?(<p>Loading....</p>) : null}
  
  
  
    {!loading && !gameOver? (<div>
    <QuestionCard

  questionNum={number + 1}

  totalQuestions={TOTAL_QUESTIONS} 
  questions={questions[number].question}

  answer={questions[number].answer}

  userAnswer={userAnswer? userAnswer[number]: undefined}
  callback={CheckAnswer}

  /></div>) : null}
    
  {!gameOver && !loading && userAnswer.length===number + 1 && number !==TOTAL_QUESTIONS - 1?
  (<button className='next' onClick={nextQuestion}> Next</button>) : null}</Wrapper>
    
 

    </>
  );
}

export default App;

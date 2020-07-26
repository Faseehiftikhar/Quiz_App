import React from 'react'
import { Wrapper, ButtonWrapper } from './main.style';


type props={

    questions: string;
    answer:   string[];
    callback: any;
    userAnswer: any;
    questionNum: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<props> = ({questions,answer,callback,userAnswer,questionNum,totalQuestions})=> {
    
    return (
         <Wrapper> <p> Questions: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions}}/>
      <div>{answer.map( answer => 
        (
        <ButtonWrapper correct = {userAnswer?.correctAnswer === answer}
        userClicked = { userAnswer?.answer === answer }>
      

            <button disabled={userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html:answer}}/>
            </button>



            </ButtonWrapper>))
            }
            </div>
            </Wrapper>
        
           
        
    )
}
export default QuestionCard;

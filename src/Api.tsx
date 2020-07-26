import {shuffleArray} from './utilities';


export const fetchQuestions= async(amount: number, difficulty: Difficulty)=>{

    const endpoint =`https://opentdb.com/api.php?amount=${amount}&difficuly=${difficulty}&type=multiple`
    const data = await(await fetch(endpoint)).json();

    return data.results.map((questions: Question) => (
        {
            ...questions,
            answer: shuffleArray([...questions.incorrect_answers,questions.correct_answer]) 
        }
    ))
};



export enum Difficulty {
    EASY="easy",
    MEDIUM="medium",
    HARD="hard",

}
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string

}
export type QuestionState= Question & { answer: string[]
};
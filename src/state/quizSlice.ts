import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType,Option } from "@/components/tournament/StartQuestions";
import { loadState } from "@/util/localStorage";



export type Question = {
  _id: string;
  question: string;
  majorId: string;
  options: Option[];
  correctOptionIndex: number;
  totalPoints: number;
  createdAt: Date;
}

const preloadedState = loadState()
let initialState = {} as InitialStateType;

if(preloadedState?.tournament.status === "active"){
initialState = preloadedState.tournament
} else {
  initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}
}



export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    preloadedState:(state, action: PayloadAction<InitialStateType>) => {
      return { ...state, ...action.payload }
    },
    dataRecieved:(state,action:PayloadAction<Question[]>) => {
        state.questions= action.payload;
        state.status= "ready";
   },
   dataFailed:(state) => {
    state.status= "error";
   },
   starQuiz:(state)=>{
    state.status= "active";
   },
   newAnswer:(state,action:PayloadAction<number|null>) => {
    const question = state.questions[state.index];
    if(!question) return state;
    state.answer= action.payload;
    if(action.payload === question.correctOptionIndex){
        state.points += question.totalPoints;
    } 
   },
   nextQuestion:(state) => {
    state.index++;
    state.answer=null;
   },
   finishQuiz:(state) => {
    state.status= "finished";
    if(state.points > state.highscore){
      state.highscore= state.points;
    }
   },
   restart:(state) => {
    state.index=0;
    state.points=0;
    state.status= "ready";
   },
  }
})

export const {starQuiz,newAnswer,nextQuestion,finishQuiz,restart,dataRecieved,dataFailed}=tournamentSlice.actions;
export default tournamentSlice.reducer;
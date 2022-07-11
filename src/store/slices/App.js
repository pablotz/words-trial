import {createSlice} from '@reduxjs/toolkit';

export const AppEmptySlice = {
    error: false,
    correct: false,
    score: 0,
    lastScore: 0,
    allAnswered: [],
    letters: [],
    isRunning: false,
    endGame: false,
    theme: localStorage.getItem("theme")
}

export const AppSlice = createSlice({
    name: "App",
    initialState: AppEmptySlice,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload; 
        },
        setCorrect: (state, action) => {
            state.correct = action.payload; 
        },
        setAnswered: (state, action) => {
            state.allAnswered = [...state.allAnswered, action.payload]
        },
        setLetters: (state, action) => {
            state.letters = action.payload
        },
        popLetters: (state, action) => {
            if(state.letters[state.letters.length - 1]) {
                let arrL = state.letters.slice();
                arrL.pop();
                state.letters = arrL;
              }
        },
        setScore: (state, action) => {
            state.lastScore = action.payload
            state.score = state.score + action.payload
        }, 
        setIsRunning: (state, action) => {
            state.isRunning = action.payload
            state.endGame = false
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        resetApp: () => AppEmptySlice,
        endGame: (state) => {
            state.isRunning = false
            state.endGame = true
        },
    }
})

export const { 
    setError, 
    setCorrect, 
    setAnswered, 
    setScore, 
    setIsRunning,
    setTheme,
    setLetters,
    popLetters,
    resetApp,
    endGame
    } = AppSlice.actions;
export default AppSlice.reducer;


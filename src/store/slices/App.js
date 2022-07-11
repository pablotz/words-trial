import {createSlice} from '@reduxjs/toolkit';

export const AppEmptySlice = {
    error: false,
    correct: false,
    score: 0,
    lastScore: 0,
    allAnswered: [],
    isRunning: false,
    endGame: false
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
        setScore: (state, action) => {
            state.lastScore = action.payload
            state.score = state.score + action.payload
        }, 
        setIsRunning: (state, action) => {
            state.isRunning = action.payload
            state.endGame = false
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
    resetApp,
    endGame
    } = AppSlice.actions;
export default AppSlice.reducer;


import React, { useEffect } from 'react';
import '../styles/word_error_correct/error_correct.css'
// Redux
import {     useDispatch, useSelector } from 'react-redux'
import { setError, setCorrect } from '../store/slices/App';

const WordOutput = () => {

    const { error, correct, lastScore, endGame, score } = useSelector(state => state.AppSlice)
    const dispatch = useDispatch();

    const goodWords = [
        "Good!",
        "Perfect!",
        "Wonderful!",
        "Wow!",
        "WOOOW!",
        "Fantastic!",
        "Awesome",
        "Excellent",
        "Brillian",
        "Expert",
        "Fascinating",
        "Fantastic",
        "Impressive",
        "Mervellous",
        "Brilliant"
    ]

    useEffect(() => {
        if(error) {
            if(correct) dispatch(setCorrect(false))
            setTimeout(() => {
                dispatch(setError(false))
            }, 1000);
        }
        
        if(correct) {
            if(error) dispatch(setError(false))
            setTimeout(() => {
                dispatch(setCorrect(false))
            }, 1000);
        }
    }, [error, correct])

  return (
    <>
        <div className={error ? 'word-error open' : 'word-error out'}>
            { error && ("Not found 🙁")}
        </div>

        <div className={correct ? 'word-correct open' : 'word-correct out'}>
            {correct && (goodWords[Math.floor(Math.random() * goodWords.length)] + " +" +lastScore)}
        </div>
        {
            endGame && (
                <div className="finish">
                    {endGame && ("Finish! \n score: "+score)}
                </div>
            )
        }
    </>
    
    
  )
}

export default WordOutput
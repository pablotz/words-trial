import React from 'react'
import '../styles/score/score.css'
// Redux
import { useSelector } from 'react-redux'
import { setError, setCorrect } from '../store/slices/App';


const Score = () => {

    const { score, endGame } = useSelector(state => state.AppSlice)


  return (
    
      !endGame && (
      <div className='score'>
        Score: {score}
      </div>
      ) 
    
  )
}

export default Score
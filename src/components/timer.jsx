import React, {useEffect, useState} from 'react'
import { useTimer } from 'react-timer-hook';
import '../styles/timer/timer.css'
import { setIsRunning, resetApp, endGame } from '../store/slices/App';
import { useDispatch, useSelector } from 'react-redux';

const Timer = () => {
    const time = new Date();
    const dispatch = useDispatch();
    const { allAnswered } = useSelector(state => state.AppSlice)
    
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({time, onExpire: () => dispatch(endGame()) });

    const handleRunning = (e) => {
        e.currentTarget.blur()
        if(allAnswered.length > 0) {
            dispatch(resetApp())
        }
        const time = new Date();
        time.setSeconds(time.getSeconds() + 120);
        restart(time)
        dispatch(setIsRunning(true))
    }

    const handleRestart = (e) => {
        e.currentTarget.blur()
        const time = new Date();
        time.setSeconds(time.getSeconds() + 120);
        restart(time)
        pause()
        dispatch(resetApp())
    }
   

    useEffect(() => {
        time.setSeconds(time.getSeconds() + 60);
        restart(time)
        pause()
    }, [])

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '50px'}}>
        {
            minutes < 10 ? `0${minutes}:` : `${minutes}:`
        }
        {
            seconds < 10 ? `0${seconds}` : `${seconds}`
        }
        {
            isRunning ? '' : ' min'
        }
      </div>
        <button className='start-button' onClick={(e) => isRunning ? (handleRestart(e)) : (handleRunning(e))}>
            {!isRunning ? "Start" : "Stop"}
        </button>
    </div>
  )
}

export default Timer
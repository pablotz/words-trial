import React, { useEffect, useState } from 'react'
import refesh from '../assets/img/refresh.png'
import '../styles/letter_generated/generated.css'
import { setLetters } from '../store/slices/App';
import { useDispatch, useSelector } from 'react-redux';
import key_audio from '../assets/audio/key.wav'

const Generated = ({ generated, genLetters }) => {
  const { isRunning, letters } = useSelector(state => state.AppSlice)
  let key_keyboard = new Audio(key_audio)
  const dispatch = useDispatch();

  const handleClick = (letter) => {
    if(isRunning) {
      if(letters.length <= 5) {
        let arrL = letters.slice();
        if(generated.indexOf(letter) > -1){
          arrL.push(letter)
          dispatch(setLetters(arrL))
          key_keyboard.play()
        }
      }
    
    }
  }

  return (
    <div className='generated'>
        <button className='gen-button' onClick={() => {isRunning ? genLetters() : null}}>
          <img className='refresh-img' src={refesh} />
        </button>
        {
          generated.length > 0 && isRunning ? 
          generated.map((letter) => {
            return <div onClick={() => handleClick(letter)} className='generated-letter'>{letter}</div>
          })
          :
          <>
            <div className='generated-letter'></div>
            <div className='generated-letter'></div>
            <div className='generated-letter'></div>
            <div className='generated-letter'></div>
            <div className='generated-letter'></div>
            <div className='generated-letter'></div>
          </>

        }
    </div>
  )
}

export default Generated
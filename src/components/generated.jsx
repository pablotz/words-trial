import React, { useEffect, useState } from 'react'
import refesh from '../assets/img/refresh.png'
import '../styles/letter_generated/generated.css'
import { useDispatch, useSelector } from 'react-redux';

const Generated = ({ generated, genLetters }) => {
  const { isRunning } = useSelector(state => state.AppSlice)
  return (
    <div className='generated'>
        <button className='gen-button' onClick={() => {isRunning ? genLetters() : null}}>
          <img className='refresh-img' src={refesh} />
        </button>
        {
          generated.length > 0 && isRunning ? 
          generated.map((letter) => {
            return <div className='generated-letter'>{letter}</div>
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
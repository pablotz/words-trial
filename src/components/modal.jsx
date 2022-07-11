import React from 'react'
import '../styles/modal/modal.css'
import video from '../assets/video/video.mp4'

const Modal = () => {
  return (
    <div>
        <h2>How to play</h2>
        <p>Words trial is a game where you will test your capacity making words in a time limit</p>
        <div className='cointainer-video'>
            <video className='video' src={video} autoplay="autoplay" loop />
        </div>
        <strong>Controls</strong>
        <ul>
            <li>
                <strong>Keyboard/Mouse: </strong>
                <label>Enter your guess</label>
            </li>
            <li>
                <strong>Shift: </strong>
                <label>Re-roll your letters</label>
            </li>
            <li>
                <strong>Enter: </strong>
                <label>Send your formed word</label>
            </li>
        </ul>

        
    </div>
  )
}

export default Modal
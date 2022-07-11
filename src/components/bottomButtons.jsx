import React from 'react'
import '../styles/bottom/bottom.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from '../components/modal'
import githubLight from '../assets/img/github_white.png'
import githubDark from '../assets/img/github_dark.png'
import { useDispatch, useSelector } from 'react-redux';

const BottomButtons = () => {

    const MySwal = withReactContent(Swal)
    const { theme, isRunning } = useSelector(state => state.AppSlice)

    const launchModal = () => {
      MySwal.fire({
        title: <h1>Words Trial</h1>,
        html: <Modal />,
      })
    }

  return (
    !isRunning && (
    <div>
        <div className='instructions-container'>
            <button className='intructions-button' onClick={launchModal}>HOW TO PLAY</button>
        </div>
        <div className='github-container'>
            <a href='https://github.com/pablotz/words-trial' target="_blank">
                <img className='github-img' src={theme === "light" ? githubDark : githubLight} />
            </a>
        </div>
    </div>
    )
  )
}

export default BottomButtons
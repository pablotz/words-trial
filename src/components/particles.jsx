import React from 'react'
import '../styles/particle/particle.scss'
import { setError, setCorrect, setAnswered, setScore } from '../store/slices/App';
import { useDispatch, useSelector } from 'react-redux';

const Particles = () => {

    const { allAnswered } = useSelector(state => state.AppSlice)

  return (
    <div id="particle-container">
        {
            allAnswered.map((answered) => {
                return ( <div className='particle'>{answered.toUpperCase()}</div> )
            })
        }
</div>
  )
}

export default Particles
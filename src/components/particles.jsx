import React from 'react'
import '../styles/particle/particle.scss'
import { useSelector } from 'react-redux';

const Particles = () => {

    const { allAnswered, theme } = useSelector(state => state.AppSlice)

  return (
    <div id="particle-container">
        {
            allAnswered.map((answered) => {
                return ( <div className="particle">{answered.toUpperCase()}</div> )
            })
        }
</div>
  )
}

export default Particles
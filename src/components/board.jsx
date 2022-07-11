import React, {useState, useEffect} from 'react';
import check from '../assets/img/check.png';
import back from '../assets/img/backspace.png';
import '../styles/board/board.css';
import correct_audio from '../assets/audio/correct.mp3'
import key_audio from '../assets/audio/key.wav'
import { setError, setCorrect, setAnswered, setScore, setLetters, popLetters } from '../store/slices/App';
import { useDispatch, useSelector } from 'react-redux';

const Board = ({ generated, genLetters }) => {

  const dispatch = useDispatch();
  const { allAnswered, isRunning, letters ,theme } = useSelector(state => state.AppSlice)

  const time = new Date();
  time.setSeconds(time.getSeconds() + 100);
  let correct = new Audio(correct_audio)
  let key_keyboard = new Audio(key_audio)
  correct.volume = 0.4;


  const handleKeyboard = (e) => {
    if(e.key === "Enter") {
      sendWord();

    } else if (e.key === "Backspace") {
      popLetter()
      
    } else if (e.key === "Shift"){ 
      genLetters()
    } else if (isRunning){
      setWord(e.key)
    }
  }

  const popLetter = () => {
    if(isRunning) dispatch(popLetters())
  }

  const setWord = (word) => {
    if(letters.length <= 5) {
      let arrL = letters.slice();
      if(generated.indexOf(word.toUpperCase()) > -1){
        arrL.push(word)
        dispatch(setLetters(arrL))
        key_keyboard.play()
      }
    }
  }

  const sendWord = async () => {
    if(letters.length > 1 && isRunning){
      let word = letters.join('')

      if(!allAnswered.find(item => item.toLowerCase() === word.toLowerCase())){

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if(response !== null ){
          if(response.status === 404){
            dispatch(setError(true))
            
          } else if(response.status === 200) {
            dispatch(setAnswered(word.toLowerCase()))
            dispatch(setCorrect(true))
            dispatch(
              setScore(genScore(letters.length))
            )
            dispatch(setLetters([]))
            correct.play()
          }
        
        }
      } 
      }
  }
  
  const genScore = (length) => {
    switch (length) {
      case 2:
        return 50;
      
      case 3: 
        return 100;

      case 4: 
        return 150;

      case 5: 
        return 175;

      case 6:
        return 200;
    }
  }

  useEffect(() => {
      document.addEventListener("keydown", handleKeyboard)

      return() => {
        document.removeEventListener("keydown", handleKeyboard)
      }
 
  })

  useEffect(() => {
    console.log(letters)
    if(!isRunning) dispatch(setLetters([]))
  }, [isRunning])


  return (
    <>
      <div className='board'>
        {
          <>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[0]}
            </div>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[1]}
            </div>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[2]}  
            </div>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[3]}  
            </div>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[4]}  
            </div>
            <div className={theme === "light" ? "letter" : "letter-dark"}>
              {letters[5]}    
            </div>
            <div className='check-container'> 
              <button className='back-button' onClick={() => popLetter()}>
                <img className='refresh-img' src={back} />
              </button>
            </div>
            <div className='check-container'> 
              <button className='check-button' onClick={() => sendWord()}>
                <img className='refresh-img' src={check} />
              </button>
            </div>
          </>
        
        }
      </div>
    </>
  )
}

export default Board
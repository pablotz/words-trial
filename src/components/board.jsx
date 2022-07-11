import React, {useState, useEffect} from 'react';
import check from '../assets/img/check.png';
import '../styles/board/board.css';
import correct_audio from '../assets/audio/correct.mp3'
import key_audio from '../assets/audio/key.wav'
import { setError, setCorrect, setAnswered, setScore } from '../store/slices/App';
import { useDispatch, useSelector } from 'react-redux';

const Board = ({ generated, genLetters }) => {

  const [letters, setLetters] = useState([]);
  const dispatch = useDispatch();
  const { allAnswered, isRunning } = useSelector(state => state.AppSlice)

  const time = new Date();
  time.setSeconds(time.getSeconds() + 100);
  let correct = new Audio(correct_audio)
  let key_keyboard = new Audio(key_audio)
  correct.volume = 0.4;


  const handleKeyboard = (e) => {
    if(e.key === "Enter") {
      sendWord();

    } else if (e.key === "Backspace" && isRunning) {
      
      if(letters[letters.length - 1]) {
        let arrL = letters.slice()
        arrL.pop()
        setLetters(arrL)
      }
    } else if (e.key === "Shift"){ 
      genLetters()
    } else if (isRunning){

      if(letters.length <= 5) {
        let arrL = letters.slice();
        if(generated.indexOf(e.key.toUpperCase()) > -1){
          arrL.push(e.key)
          setLetters(arrL)
          key_keyboard.play()
        }
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
            setLetters([])
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


  return (
    <>
      <div className='board'>
        {
          <>
            <div className="letter">
              {letters[0]}
            </div>
            <div className="letter">
              {letters[1]}
            </div>
            <div className="letter">
              {letters[2]}  
            </div>
            <div className="letter">
              {letters[3]}  
            </div>
            <div className="letter">
              {letters[4]}  
            </div>
            <div className="letter">
              {letters[5]}    
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
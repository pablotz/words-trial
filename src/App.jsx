import { useEffect, useState } from 'react'
import Board from './components/board'
import Generated from './components/generated'
import './styles/main/app.css'

//Redux
import store from './store/index'
import { Provider } from 'react-redux'
import WordOutput from './components/wordOutput'
import Score from './components/score'
import Particles from './components/particles'
import Timer from './components/timer'
import DarkMode from './components/darkMode'
import BottomButtons from './components/bottomButtons'

function App() {

  const [generated, setGenerated] = useState([]);

  let genLetters = () => {
    var result = '';
    let newLetter = ""
    for ( var i = 0; i < 6; i++ ) {
      newLetter = makeRandomLetter()
      let findResult = result.split('')

      while(findResult.find((letter) => letter.toLowerCase() === newLetter.toLowerCase())){
        newLetter = makeRandomLetter()
      }

      result += newLetter;
    }
     verifyVowels(result)
  }

  const makeRandomLetter = () => {
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const verifyVowels = (letters) => {
    let result = letters.split('');
    let vowels = ['A','E','I','O','U'];
    let countVowels = 0;
    let notVowelIndex = [];
    result.map((letter, index) => {
      if(vowels.indexOf(letter) !== -1){
        countVowels++;
      } else {
        notVowelIndex.push(index)
      }
    })

    if(countVowels < 2) {
      let ramdomVowel = vowels[randomIntFromInterval(0, 4)]
      let randomIndex = randomIntFromInterval(1, notVowelIndex.length)
      while(result.find((letter) => letter === ramdomVowel)){
        ramdomVowel = vowels[randomIntFromInterval(0, 4)]
      } 
      result[randomIndex - 1] = ramdomVowel;
    }

    setGenerated(result)
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    genLetters();
  },[])
  return (
    <Provider store={store}>
      <div className='container'>
        <Particles />
        <div className="dark-mode-container">
          <DarkMode />
        </div>
        <div className="app">
          <Score />
        </div>
        <div className="app">
          <WordOutput />
        </div>
        <div className='app'>
          <Board generated={generated} genLetters={genLetters}/>
        </div>
        <div className='app'>
          <Generated generated={generated} genLetters={genLetters}/>
        </div>
        <div className="app">
          <Timer />
        </div>
        <div>
          <BottomButtons />
        </div>
      </div>
    </Provider>
  )
}

export default App

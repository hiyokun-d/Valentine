import { useState } from 'react'
import './App.css'
import Greetings from './components/greetings'
import Complement from './components/complement'

function App() {
  const [backgroundPink, setBackgroundPink] = useState(false)
  const [isGreetingsDone, setGreetingDone] = useState(false)
  return (
    <div className={`container ${backgroundPink ? "pinkBackground" : "whiteBackground"} `}>
      <Greetings setBackgroundToPink={setBackgroundPink} setGreetingsDone={setGreetingDone} />
      <Complement isGreetingDone={isGreetingsDone} />
    </div>
  )
}

export default App

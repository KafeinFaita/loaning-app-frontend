import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api');
        console.log(response)
        setMsg(response.data.msg)
        
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      {msg}
    </div>
  )
}

export default App

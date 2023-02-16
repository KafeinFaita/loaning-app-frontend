import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL);
        setMsg(response.data.msg)
        console.log(import.meta.env)
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

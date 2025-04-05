import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'; 

function App() {
  const [news, setNews] = useState([]); 

  const fetchAPI = async () => { 
    try { 
      const response = await axios.get('http://localhost:3000/');
      setNews(response.data);
    }
    catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="App">
    <h1>High Impact Forex News</h1>
    {news.length > 0 ? (
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <strong>{item.time}</strong> — {item.currency}: {item.event} ({item.impact})
          </li>
        ))}
      </ul>
    ) : (
      <p>Loading news...</p>
    )}
  </div>
  )
}

export default App

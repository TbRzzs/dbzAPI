import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [characters, setCharacters] = useState([])
  const apisURL = [
    'https://dragonball-api.com/api/characters/',
    'https://dragonball-api.com/api/transformations/',
  ]
 

  useEffect(() => {
    fetchPromisesData()
  }, [])


 const fetchPromisesData = async () => {

  try {
    const promises = apisURL.map(url => fetch(url))
    const data = await Promise.all(promises)
    const dataJson = await Promise.all(data.map(data => data.json()))
    let typesOfFetchedData = dataJson.map((data, index) =>({
      type: index,
      data: data[index]
    }))

    console.log('DataJson: ', dataJson)
    console.log('Types of fetched data: ', typesOfFetchedData)



    setCharacters(data)
    
  } catch (error) {
    console.log(error)
  }
 }
  console.log(characters)

  return (
    <div className="App">
      <h1>Dragon Ball API</h1>
      <div className='characters'>
        {characters.map(characters => (
          <div key={characters.id}>
            <h2>{characters.name}</h2>
            <img src={characters.image} alt={characters.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

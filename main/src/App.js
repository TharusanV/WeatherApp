import './App.css';
import axios from 'axios' //Library that allows you to make requests to an API
import {useState} from 'react'

function App() {

  const api = {key: "7789e24a2f20807676e14f669853b082", url: "https://api.openweathermap.org/data/2.5/"}

  const [data, setData] = useState({})
  const [location, setLocation] = useState('');

  function searchLocation(event){
    if(event.key === "Enter"){
      axios.get(`${api.url}weather?q=${location}&units=metric&APPID=${api.key}`).then((result) => {
        setData(result.data)
        console.log(result.data)
      })
    }
  }

  return (
    <div className="App">
      <div className='SearchBoxContainer'>
        <input className='SearchBox' value={location} type="text" placeholder='Enter Location' onChange={(event) => {setLocation(event.target.value);}} onKeyPress={searchLocation}/>
      </div>

      <div className='WeatherInfoContainer'>
        <div className='PrimaryData'>
          <div className='LocationContainer'>
            <p className='LocationText'>{data.name}</p>
          </div>
          <div className='TempContainer'>
            {data.main ? <p className='TempText'>{data.main.temp} °</p> : null}
          </div>
          <div className='WeatherConditionsContainer'>
            {data.weather ? <p className='WeatherConditionText'>{data.weather[0].main} - {data.weather[0].description}</p> : null}
          </div>
        </div>

        <div className='SecondaryData'>
          <div className='TempFeelsLikeContainer'>
            {data.main ? <p className='TempFeelsLikeText'>{data.main.feels_like} °C</p> : null}
            <p className='TempFeelsLikeTitle'>Feels Like</p>
          </div>
          <div className='HumidityContainer'>
            {data.main ? <p className='HumidityText'>{data.main.humidity} %</p> : null}
            <p className='HumidityTitle'>Humidity</p>
          </div>
          <div className='WindSpeedContainer'>
            {data.wind ? <p className='WindSpeedText'>{data.wind.speed} mph</p> : null}
            <p className='WindSpeedTitle'>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

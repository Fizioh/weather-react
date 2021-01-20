import React, { useState } from 'react';

const api = {
  key: "d5995c3650f5085567a18e5291da7b10",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

const dateBuilder = (d) => {
  let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
  let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return  `${day} ${date} ${month} ${year}`
}

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' :'app') : 'app'}>
      <main>
      <div className="titre">
              <h1>React Meteo</h1> 
  
      </div>

        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Entrez une ville..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />

        </div>
          {(typeof weather.main != "undefined") ? (
            <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>


        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
  ) : ('') }

  <div className='app'>
  {typeof weather.main === "undefined" &&
        <div>
        <div className="location-box">
          <div className="location">Ville imaginaire, ID</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>


        <div className="weather-box">
          <div className="temp">
            ?°C
          </div>
          </div>
          </div>
      }

  </div>

  <div class="container">
  <span class="react-logo">
			<span class="nucleo"></span>
		</span>
    </div>

      </main>
    </div>
  );
}

export default App;


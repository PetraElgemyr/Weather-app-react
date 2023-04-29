import axios from "axios";
import { ChangeEvent, useState } from "react";

interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

interface Current {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
}

interface Condition {
  text: string;
  icon: string;
}

interface WeatherInfo {
  location: Location;
  current: Current;
  feelslike_c: number;
  feelslike_f: number;
}

export const CurrentWeather = () => {
  const [searchText, setSearchText] = useState("");
  const [cityObject, setCityObject] = useState<WeatherInfo>();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = async () => {
    const response = await axios.get<WeatherInfo>(
      `http://api.weatherapi.com/v1/current.json?key=4498031c7d2a498cb9a102202232804&q=${searchText}`
    );
    console.log("Hämtade datan: ", response.data);
    setCityObject(response.data);
  };

  if (cityObject !== undefined) {
    return (
      <>
        <h2>Look up the weather</h2>
        <input
          type="text"
          placeholder="London"
          value={searchText}
          onChange={handleTextChange}
        />
        <button onClick={handleSearchClick}>Search</button>

        <div>
          <p>
            <span>{cityObject?.location.name}</span>
            <span>{cityObject?.location.region}</span>
            <span>{cityObject?.location.country}</span>
          </p>
          <p>
            <span>
              Temperature in celsius: {cityObject?.current.temp_c} &#x2103;{" "}
            </span>
          </p>
          <p>
            <span>
              Temperature in fahrenheit: {cityObject?.current.temp_f} &#x2109;{" "}
            </span>
          </p>
          <p>
            <span>{cityObject?.current.condition.text}</span>{" "}
            <img
              src={cityObject?.current.condition.icon}
              alt={cityObject?.current.condition.text}
            />
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Look up the weather</h2>
        <input
          type="text"
          placeholder="London"
          value={searchText}
          onChange={handleTextChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </>
    );
  }
};

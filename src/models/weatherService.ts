import axios from 'axios';

const API_KEY = 'your_openweather_api_key'; 

export interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};

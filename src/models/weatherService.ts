import axios from 'axios';
import { getCoordinatesByCity } from '../models/geocodingService';


const API_KEY = '092de45f581898ad426c57d066256785'; 
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';


export interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

// export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
//   return response.data;
// };
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=092de45f581898ad426c57d066256785


// export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2088&appid=092de45f581898ad426c57d066256785`);
//   return response.data;
// };
export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  const { lat, lon } = await getCoordinatesByCity(city);

  const response = await axios.get(WEATHER_API_URL, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: API_KEY,
    },
  });

  return response.data;
}
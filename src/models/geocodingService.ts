import axios from 'axios';

const GEOCODING_API = 'http://api.openweathermap.org/geo/1.0/direct';
const API_KEY = '092de45f581898ad426c57d066256785';

export interface GeoCoordinates {
  lat: number;
  lon: number;
}

export async function getCoordinatesByCity(city: string): Promise<GeoCoordinates> {
  try {
    const response = await axios.get(GEOCODING_API, {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
    });

    const data = response.data;

    if (data.length === 0) {
      throw new Error('City not found');
    }

    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch coordinates');
  }
}

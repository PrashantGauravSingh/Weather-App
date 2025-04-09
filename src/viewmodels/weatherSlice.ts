import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeatherByCity, WeatherResponse } from '../models/weatherService';

interface WeatherState {
  loading: boolean;
  data: WeatherResponse | null;
  error: string | null;
}

const initialState: WeatherState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const data = await getWeatherByCity(city);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default weatherSlice.reducer;

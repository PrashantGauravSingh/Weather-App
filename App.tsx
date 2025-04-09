import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import WeatherComponent from './src/views/WeatherComponent';


export default function App() {
  return (
    <Provider store={store}>
      <WeatherComponent />
    </Provider>
  );
}

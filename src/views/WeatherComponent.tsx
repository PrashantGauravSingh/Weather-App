import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Switch,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../viewmodels/weatherRepo';
import { RootState, AppDispatch } from '../store';

export default function WeatherComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);
  const [city, setCity] = useState('');
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [manualTheme, setManualTheme] = useState<'light' | 'dark'>('light');

  const systemTheme = useColorScheme();
  const currentTheme = useSystemTheme ? systemTheme : manualTheme;
  const isDarkMode = currentTheme === 'dark';

  const handleFetch = () => {
    if (city.trim()) dispatch(fetchWeather(city));
  };

  const toggleTheme = () => {
    if (useSystemTheme) {
      setUseSystemTheme(false);
      setManualTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setManualTheme(manualTheme === 'dark' ? 'light' : 'dark');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    text: { color: isDarkMode ? '#fff' : '#000' },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#ccc',
      padding: 10,
      marginBottom: 10,
      color: isDarkMode ? '#fff' : '#000',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    },
    toggleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    result: { marginTop: 20 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <Switch
          value={!useSystemTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? '#fff' : '#000'}
        />
        <Text style={[styles.text, { marginLeft: 10 }]}>
          {useSystemTheme ? 'System theme' : `Manual: ${manualTheme}`}
        </Text>
      </View>

      <Text style={[styles.text, { fontSize: 24 }]}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleFetch} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {error && <Text style={[styles.text, { color: 'red' }]}>{error}</Text>}
      {data && (
        <View style={styles.result}>
          <Text style={[styles.text, { fontSize: 20 }]}>{data.name}</Text>
          <Text style={styles.text}>{data.main.temp}°C</Text>
          <Text style={styles.text}>{data.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

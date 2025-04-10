import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Switch,
  Image,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../viewmodels/weatherSlice.ts';
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
      backgroundColor: isDarkMode ? '#121212' : '#f2f2f2',
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 10,
      borderRadius: 6,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    },
    card: {
      marginTop: 30,
      padding: 20,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      alignItems: 'center',
    },
    city: {
      fontSize: 22,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    temperature: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    condition: {
      fontSize: 18,
      fontStyle: 'italic',
      marginBottom: 10,
      color: isDarkMode ? '#ccc' : '#555',
    },
    icon: {
      width: 100,
      height: 100,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
  });

  const weatherIconUrl = data?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    : null;

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

      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleFetch} />

      {loading && <ActivityIndicator style={{ marginTop: 30 }} />}
      {error && <Text style={[styles.text, { color: 'red', marginTop: 10 }]}>{error}</Text>}

      {data && (
        <View style={styles.card}>
          <Text style={styles.city}>{data.name}</Text>
          <Text style={styles.temperature}>{data.main.temp.toFixed(1)}°C</Text>
          <Text style={styles.condition}>{data.weather[0].description}</Text>
          {weatherIconUrl && <Image source={{ uri: weatherIconUrl }} style={styles.icon} />}
        </View>
      )}
    </View>
  );
}

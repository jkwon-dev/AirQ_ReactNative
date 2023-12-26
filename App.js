<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
=======
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';

const API_KEY = "";


export default function App() {
  const [city, setCity] = useState("Loading...");
  const [currentAq, setCurrentAq] = useState("..."); 
  const [airQuality, setAirQuality] = useState();
  const getAirQuality = (data) => {
    switch(true) {
      case (data < 50) : 
        return "Good"
        break; 

        case (50 < data < 100) :
          return "Moderate"
          break;

          case (100 < data < 150) :
            return "Unhealthy for Sensitive Groups"
            break;

            case (150 < data < 200) :
              return "Unhealthy"
              break; 

              case (200 < data < 300) :
                return "Very Unhealthy"
              
                default : return "No data"
    }
}

const getWeather = async() => {
  const {granted} = await Location.requestForegroundPermissionsAsync(); 
  if (!granted) {
    console.log("No granted")
  }
  const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
  const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
  const response = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`)
  const json = await response.json();
  setCity(json.data.city)
  setAirQuality(json.data.current.pollution.aqius)
  const result = getAirQuality(json.data.current.pollution.aqius)
  setCurrentAq(result)
  
}

useEffect(() => {
  getWeather(); 
}, [])

  return (
    <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>{city}</Text>
    </View>
    <View style={styles.weather}> 
        <View style={styles.day}>
        <Text style={styles.temp}>{airQuality}</Text>
        <Text style={styles.airStatus}>{currentAq}</Text>
        </View>
    </View>
</View>
>>>>>>> f93d5fa (Initial commit)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
=======
    backgroundColor: "tomato",
  },
  city: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center"
  }, 
  cityName: {
    fontSize: 68,
    fontWeight:"500"
  },
  weather: {
    flex: 3
  }, 
  day: {
    flex: 1, 
    alignItems: "center",
  },
  temp: {
    marginTop: 50, 
    fontSize: 60,
  },
  airStatus : {
    fontSize: 60,
    fontWeight:"500"
  }
>>>>>>> f93d5fa (Initial commit)
});

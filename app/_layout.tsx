import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as Splash from 'expo-splash-screen';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import mobileAds from 'react-native-google-mobile-ads';

import CustomBannerAd from './banner';

mobileAds()
  .initialize()
  .then(status => {
    console.log("AdMob SDK Inicializado com Sucesso!", status);
  })
  .catch(error => {
    console.error("ERRO GRAVE: Falha ao Inicializar AdMob SDK:", error);
  });


Splash.preventAutoHideAsync();

function LoadingComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash/teste.gif")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.texto}>Sabor Na Mão</Text>
    </View>
  );
}


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
  });
  
  const [splashTimerFinished, setSplashTimerFinished] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      if (fontsLoaded) {
        await Splash.hideAsync();
        
        setTimeout(() => {
          setSplashTimerFinished(true);
        }, 3000);
      }
    }
    prepareApp();
  }, [fontsLoaded]);

  useEffect(() => {
      if (fontsLoaded && splashTimerFinished) {
          router.replace("/home");
      }
  }, [fontsLoaded, splashTimerFinished]);


  if (!fontsLoaded || !splashTimerFinished) {
    return <LoadingComponent />;
  }
  
  return (
    <View style={styles.appContainer}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
      </Stack>
      
      <CustomBannerAd />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  texto: {
    fontFamily: "Chewy",
    fontSize: 36,
    color: "#84b6aa",
    marginTop: 20,
    alignSelf: "center",
    left: 20
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
});
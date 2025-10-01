import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from 'expo-splash-screen'; // 🚨 CORREÇÃO 1: Importação correta do Splash
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"; // 🚨 CORREÇÃO 2: Importação da Image

// 🚨 Chamada de prevenção: Deve ser feita imediatamente, fora do componente.
SplashScreen.preventAutoHideAsync();

export default function CustomSplashScreen() {
  const [fontsLoaded] = useFonts({
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        // As fontes carregaram. Agora podemos esconder o splash nativo.
        await SplashScreen.hideAsync();
        
        // Ativamos o estado para renderizar a tela customizada.
        setAppIsReady(true);
        
        // Iniciamos o timer para navegação após 3 segundos.
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      }
    }
    prepare();
  }, [fontsLoaded]);

  // Enquanto as fontes não carregam ou o estado 'appIsReady' é falso, mostramos nada.
  // O usuário ainda verá o Splash Nativo padrão do Expo.
  if (!appIsReady) {
    return null;
  }

  // A tela customizada é mostrada após o nativo sumir.
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
  },
});

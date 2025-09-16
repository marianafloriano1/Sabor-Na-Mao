import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const animationRef = useRef<LottieView>(null);
   const [fontsLoaded] = useFonts({
      Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
      Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
      Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
    });
    
  useEffect(() => {
   
    const timer = setTimeout(() => {
      router.replace("/"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("../assets/splash/teste.json")}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={() => router.replace("/")}
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
  animation: {
    width: 300,
    height: 300,
  },
  texto:{
    fontFamily: "Chewy",
    fontSize: 36,
    color: "#84b6aa"
  }
});

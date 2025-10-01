import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const PRODUCTION_AD_UNIT_ID = 'ca-app-pub-3940256099942544/6300978111'; //mudar o id
const adUnitId = __DEV__ ? TestIds.BANNER : PRODUCTION_AD_UNIT_ID;

export default function CustomBannerAd() {
  const [adStatus, setAdStatus] = useState("Carregando anúncio...");

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        onAdLoaded={() => {
          setAdStatus("Anúncio carregado");
        }}
        onAdFailedToLoad={(error) => {
          setAdStatus(`Falha ao carregar (${(error as any).code})`);
        }}
      />

      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          {adStatus}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
  },
  debugContainer: {
    alignItems: 'center',
  },
  debugText: {
    color: '#565656', // cor neutra
    fontSize: 12,
  }
});

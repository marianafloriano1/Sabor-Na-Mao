// InterstitialAdHandler.tsx
import { Alert } from "react-native";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-1704799142620945/9845120562"; // ID teste oficial Google

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId);

export function anunciobola(onAdClosed: () => void): void {
  const adEventListener = interstitial.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      adEventListener(); // remove listener
      onAdClosed(); // executa ação após fechar anúncio
    }
  );

  const loadedListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitial.show();
    loadedListener(); // remove listener após mostrar anúncio
  });

  const errorListener = interstitial.addAdEventListener(
    AdEventType.ERROR,
    (error: { message: string }) => {
      Alert.alert("Erro ao carregar anúncio", error.message);
      adEventListener();
      loadedListener();
      errorListener();
      onAdClosed(); // segue a ação mesmo com erro no anúncio
    }
  );

  interstitial.load();
}

import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-1704799142620945/3471283903";

export function recompensa(onRewardEarned: () => void) {
  const rewarded = RewardedAd.createForAdRequest(adUnitId);

  // Evento quando o anúncio carrega
  const loadedListener = rewarded.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      rewarded.show();
    }
  );

  // Evento de recompensa
  const rewardListener = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    (reward: { type: string; amount: number }) => {
      onRewardEarned();
    }
  );

  // Evento quando o anúncio fecha
  const closedListener = rewarded.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      loadedListener();
      rewardListener();
      closedListener();
    }
  );

  // Carrega o anúncio
  rewarded.load();
}

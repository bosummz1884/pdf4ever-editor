import React from 'react';
import { usePremiumAccess } from './utils/usePremiumAccess';
import PremiumUpgradeBanner from './components/PremiumUpgradeBanner';

/**
 * Wraps children with logic to:
 * - Grant temporary trial access on first load
 * - Show upgrade banner if premium is locked
 */
export default function PremiumWrapper({ children }) {
  const { hasPremium, trialUsed, useTrial, unlockPremium } = usePremiumAccess();

  React.useEffect(() => {
    if (!trialUsed && !hasPremium) {
      useTrial(); // auto-activate trial for first document
    }
  }, [trialUsed, hasPremium, useTrial]);

  const handleUpgrade = () => {
    unlockPremium();
    alert('Premium unlocked! You now have full access forever.');
  };

  return (
    <>
      {!hasPremium && trialUsed && (
        <PremiumUpgradeBanner onUpgrade={handleUpgrade} />
      )}
      {children({ hasPremium })}
    </>
  );
}

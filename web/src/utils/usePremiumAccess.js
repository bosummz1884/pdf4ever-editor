import { useEffect, useState } from 'react';

/**
 * Handles premium feature access logic:
 * - Grants full access on first document edit (trial)
 * - Stores permanent unlock if license is purchased
 */
export function usePremiumAccess() {
  const [hasPremium, setHasPremium] = useState(false);
  const [trialUsed, setTrialUsed] = useState(false);

  useEffect(() => {
    const trial = localStorage.getItem('trialUsed') === 'true';
    const license = localStorage.getItem('premiumLicense') === 'true';

    setTrialUsed(trial);
    setHasPremium(license || !trial); // full access if trial not yet used
  }, []);

  const useTrial = () => {
    if (!trialUsed) {
      localStorage.setItem('trialUsed', 'true');
      setTrialUsed(true);
    }
  };

  const unlockPremium = () => {
    localStorage.setItem('premiumLicense', 'true');
    setHasPremium(true);
  };

  return {
    hasPremium,
    trialUsed,
    useTrial,
    unlockPremium,
  };
}

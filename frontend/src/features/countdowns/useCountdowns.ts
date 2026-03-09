import { useState, useEffect } from 'react';
import { CountdownEvent } from './types';
import { saveCountdowns, loadCountdowns } from './storage';

export function useCountdowns() {
  const [countdowns, setCountdowns] = useState<CountdownEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load countdowns on mount
  useEffect(() => {
    const loaded = loadCountdowns();
    setCountdowns(loaded);
    setIsLoaded(true);
  }, []);

  // Save countdowns whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveCountdowns(countdowns);
    }
  }, [countdowns, isLoaded]);

  const addCountdown = (countdown: CountdownEvent) => {
    setCountdowns((prev) => [...prev, countdown]);
  };

  const updateCountdown = (id: string, updates: Partial<CountdownEvent>) => {
    setCountdowns((prev) =>
      prev.map((countdown) =>
        countdown.id === id ? { ...countdown, ...updates } : countdown
      )
    );
  };

  const deleteCountdown = (id: string) => {
    setCountdowns((prev) => prev.filter((countdown) => countdown.id !== id));
  };

  return {
    countdowns,
    addCountdown,
    updateCountdown,
    deleteCountdown,
    isLoaded,
  };
}

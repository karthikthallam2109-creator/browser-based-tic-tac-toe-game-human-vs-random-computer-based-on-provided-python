import { CountdownEvent } from './types';
import { saveToLocalStorage, loadFromLocalStorage } from '../storage/localStorage';

const COUNTDOWNS_KEY = 'countdowns';
const FIRED_REMINDERS_KEY = 'fired_reminders';

export function saveCountdowns(countdowns: CountdownEvent[]): void {
  saveToLocalStorage(COUNTDOWNS_KEY, countdowns);
}

export function loadCountdowns(): CountdownEvent[] {
  const countdowns = loadFromLocalStorage<CountdownEvent[]>(COUNTDOWNS_KEY, []);
  
  // Validate each countdown
  return countdowns.filter((countdown) => {
    return (
      countdown.id &&
      countdown.title &&
      countdown.targetDate &&
      countdown.eventType &&
      Array.isArray(countdown.reminders)
    );
  });
}

export function saveFiredReminders(firedReminders: Set<string>): void {
  saveToLocalStorage(FIRED_REMINDERS_KEY, Array.from(firedReminders));
}

export function loadFiredReminders(): Set<string> {
  const reminders = loadFromLocalStorage<string[]>(FIRED_REMINDERS_KEY, []);
  return new Set(reminders);
}

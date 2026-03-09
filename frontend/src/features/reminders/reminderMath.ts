import { CountdownEvent, ReminderSettings } from '../countdowns/types';

export function getReminderTriggerTime(
  targetDate: string,
  offsetMinutes: number
): Date {
  const target = new Date(targetDate);
  const triggerTime = new Date(target.getTime() - offsetMinutes * 60 * 1000);
  return triggerTime;
}

export function getReminderId(countdownId: string, reminderIndex: number): string {
  return `${countdownId}-${reminderIndex}`;
}

export function shouldTriggerReminder(
  countdown: CountdownEvent,
  reminder: ReminderSettings,
  reminderIndex: number,
  now: Date,
  firedReminders: Set<string>
): boolean {
  if (!reminder.enabled) {
    return false;
  }

  const reminderId = getReminderId(countdown.id, reminderIndex);
  if (firedReminders.has(reminderId)) {
    return false;
  }

  const triggerTime = getReminderTriggerTime(countdown.targetDate, reminder.offsetMinutes);
  
  // Trigger if we've passed the trigger time (with 1 minute grace period)
  const gracePeriodMs = 60 * 1000;
  return now.getTime() >= triggerTime.getTime() && 
         now.getTime() <= triggerTime.getTime() + gracePeriodMs;
}

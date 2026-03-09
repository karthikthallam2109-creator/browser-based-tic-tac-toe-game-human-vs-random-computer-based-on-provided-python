import { useEffect, useState } from 'react';
import { CountdownEvent } from '../countdowns/types';
import { shouldTriggerReminder, getReminderId } from './reminderMath';
import { showBrowserNotification } from '../notifications/browserNotify';
import { toast } from 'sonner';
import { saveFiredReminders, loadFiredReminders } from '../countdowns/storage';

export function useReminders(countdowns: CountdownEvent[], now: Date) {
  const [firedReminders, setFiredReminders] = useState<Set<string>>(() => loadFiredReminders());

  useEffect(() => {
    saveFiredReminders(firedReminders);
  }, [firedReminders]);

  useEffect(() => {
    countdowns.forEach((countdown) => {
      countdown.reminders.forEach((reminder, index) => {
        if (shouldTriggerReminder(countdown, reminder, index, now, firedReminders)) {
          const reminderId = getReminderId(countdown.id, index);
          
          // Mark as fired
          setFiredReminders((prev) => new Set(prev).add(reminderId));

          // Show in-app toast
          toast.info(`Reminder: ${countdown.title}`, {
            description: reminder.label,
            duration: 10000,
          });

          // Show browser notification if permitted
          showBrowserNotification(
            `Reminder: ${countdown.title}`,
            reminder.label
          );
        }
      });
    });
  }, [countdowns, now, firedReminders]);

  const clearFiredReminders = () => {
    setFiredReminders(new Set());
  };

  return {
    firedReminders,
    clearFiredReminders,
  };
}

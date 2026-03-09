import { CountdownEvent, ReminderSettings } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateCountdown(
  title: string,
  targetDate: string,
  reminders: ReminderSettings[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!title || title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (title.trim().length > 100) {
    errors.push({ field: 'title', message: 'Title must be 100 characters or less' });
  }

  if (!targetDate) {
    errors.push({ field: 'targetDate', message: 'Target date is required' });
  } else {
    const date = new Date(targetDate);
    if (isNaN(date.getTime())) {
      errors.push({ field: 'targetDate', message: 'Invalid date format' });
    }
  }

  reminders.forEach((reminder, index) => {
    if (reminder.enabled && !reminder.label) {
      errors.push({ field: `reminder-${index}`, message: 'Reminder label is required' });
    }
  });

  return errors;
}

export type EventType = 'birthday' | 'travel' | 'work' | 'anniversary' | 'custom';

export interface ReminderSettings {
  enabled: boolean;
  offsetMinutes: number; // Minutes before event (negative = after event)
  label: string; // e.g., "1 day before", "At event time"
}

export interface CountdownEvent {
  id: string;
  title: string;
  targetDate: string; // ISO 8601 datetime string
  notes?: string;
  eventType: EventType;
  reminders: ReminderSettings[];
  createdAt: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isEnded: boolean;
}

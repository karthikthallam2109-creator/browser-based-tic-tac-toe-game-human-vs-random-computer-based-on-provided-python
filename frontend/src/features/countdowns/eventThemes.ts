import { EventType } from './types';

export interface EventTheme {
  label: string;
  badgeClass: string;
  cardClass: string;
  accentColor: string;
}

export const eventThemes: Record<EventType, EventTheme> = {
  birthday: {
    label: 'Birthday',
    badgeClass: 'bg-[oklch(var(--birthday)/0.15)] text-[oklch(var(--birthday))] border-[oklch(var(--birthday)/0.3)]',
    cardClass: 'event-birthday',
    accentColor: 'oklch(var(--birthday))',
  },
  travel: {
    label: 'Travel',
    badgeClass: 'bg-[oklch(var(--travel)/0.15)] text-[oklch(var(--travel))] border-[oklch(var(--travel)/0.3)]',
    cardClass: 'event-travel',
    accentColor: 'oklch(var(--travel))',
  },
  work: {
    label: 'Work Deadline',
    badgeClass: 'bg-[oklch(var(--work)/0.15)] text-[oklch(var(--work))] border-[oklch(var(--work)/0.3)]',
    cardClass: 'event-work',
    accentColor: 'oklch(var(--work))',
  },
  anniversary: {
    label: 'Anniversary',
    badgeClass: 'bg-[oklch(var(--anniversary)/0.15)] text-[oklch(var(--anniversary))] border-[oklch(var(--anniversary)/0.3)]',
    cardClass: 'event-anniversary',
    accentColor: 'oklch(var(--anniversary))',
  },
  custom: {
    label: 'Custom',
    badgeClass: 'bg-[oklch(var(--custom)/0.15)] text-[oklch(var(--custom))] border-[oklch(var(--custom)/0.3)]',
    cardClass: 'event-custom',
    accentColor: 'oklch(var(--custom))',
  },
};

export function getEventTheme(eventType: EventType): EventTheme {
  return eventThemes[eventType];
}

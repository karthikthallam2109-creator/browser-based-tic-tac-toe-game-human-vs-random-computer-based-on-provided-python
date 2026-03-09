import { TimeRemaining } from '../countdowns/types';

export function calculateTimeRemaining(targetDate: string, now: Date): TimeRemaining {
  const target = new Date(targetDate);
  const totalMilliseconds = target.getTime() - now.getTime();
  
  if (totalMilliseconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: 0,
      isEnded: true,
    };
  }

  const seconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalMilliseconds,
    isEnded: false,
  };
}

export function formatTimeRemaining(remaining: TimeRemaining): string {
  if (remaining.isEnded) {
    return 'Event ended';
  }

  const parts: string[] = [];
  
  if (remaining.days > 0) {
    parts.push(`${remaining.days}d`);
  }
  if (remaining.hours > 0 || remaining.days > 0) {
    parts.push(`${remaining.hours}h`);
  }
  parts.push(`${remaining.minutes}m`);

  return parts.join(' ');
}

export function formatTimeRemainingLong(remaining: TimeRemaining): string {
  if (remaining.isEnded) {
    return 'This event has ended';
  }

  const parts: string[] = [];
  
  if (remaining.days > 0) {
    parts.push(`${remaining.days} ${remaining.days === 1 ? 'day' : 'days'}`);
  }
  if (remaining.hours > 0) {
    parts.push(`${remaining.hours} ${remaining.hours === 1 ? 'hour' : 'hours'}`);
  }
  if (remaining.minutes > 0) {
    parts.push(`${remaining.minutes} ${remaining.minutes === 1 ? 'minute' : 'minutes'}`);
  }

  if (parts.length === 0) {
    return 'Less than a minute';
  }

  return parts.join(', ');
}

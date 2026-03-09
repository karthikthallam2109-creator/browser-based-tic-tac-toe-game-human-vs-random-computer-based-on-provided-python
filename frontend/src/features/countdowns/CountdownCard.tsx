import { CountdownEvent } from './types';
import { calculateTimeRemaining, formatTimeRemaining } from '../time/formatRemaining';
import { getEventTheme } from './eventThemes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Edit2, Trash2, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownCardProps {
  countdown: CountdownEvent;
  now: Date;
  onEdit: (countdown: CountdownEvent) => void;
  onDelete: (id: string) => void;
}

export function CountdownCard({ countdown, now, onEdit, onDelete }: CountdownCardProps) {
  const remaining = calculateTimeRemaining(countdown.targetDate, now);
  const theme = getEventTheme(countdown.eventType);
  const activeReminders = countdown.reminders.filter((r) => r.enabled);

  return (
    <Card className={cn('relative overflow-hidden transition-all hover:shadow-md', theme.cardClass)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2 truncate">{countdown.title}</CardTitle>
            <Badge variant="outline" className={cn('text-xs', theme.badgeClass)}>
              {theme.label}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(countdown)}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(countdown.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{new Date(countdown.targetDate).toLocaleString()}</span>
        </div>

        {remaining.isEnded ? (
          <div className="text-center py-6">
            <p className="text-2xl font-semibold text-muted-foreground">Event Ended</p>
            <p className="text-sm text-muted-foreground mt-1">
              This countdown has finished
            </p>
          </div>
        ) : (
          <div className="text-center py-4 bg-accent/30 rounded-lg">
            <div className="text-3xl font-bold" style={{ color: theme.accentColor }}>
              {formatTimeRemaining(remaining)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">remaining</p>
          </div>
        )}

        {countdown.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t">
            {countdown.notes}
          </p>
        )}

        {activeReminders.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
            <Bell className="h-3 w-3" />
            <span>{activeReminders.length} reminder{activeReminders.length !== 1 ? 's' : ''} set</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

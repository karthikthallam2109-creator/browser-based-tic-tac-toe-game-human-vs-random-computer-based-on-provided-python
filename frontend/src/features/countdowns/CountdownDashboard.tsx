import { useState } from 'react';
import { useCountdowns } from './useCountdowns';
import { useNow } from '../time/useNow';
import { useReminders } from '../reminders/useReminders';
import { useNotificationPermission } from '../notifications/useNotificationPermission';
import { CountdownCard } from './CountdownCard';
import { CountdownFormDialog } from './CountdownFormDialog';
import { CountdownEvent } from './types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Plus, Bell, BellOff, AlertCircle } from 'lucide-react';

export function CountdownDashboard() {
  const { countdowns, addCountdown, updateCountdown, deleteCountdown, isLoaded } = useCountdowns();
  const now = useNow(1000);
  const { permission, requestPermission, isDefault, isDenied } = useNotificationPermission();
  useReminders(countdowns, now);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCountdown, setEditingCountdown] = useState<CountdownEvent | undefined>();

  const handleCreate = () => {
    setEditingCountdown(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (countdown: CountdownEvent) => {
    setEditingCountdown(countdown);
    setDialogOpen(true);
  };

  const handleSave = (countdown: CountdownEvent) => {
    if (editingCountdown) {
      updateCountdown(countdown.id, countdown);
    } else {
      addCountdown(countdown);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this countdown?')) {
      deleteCountdown(id);
    }
  };

  // Sort countdowns: upcoming first, then by date
  const sortedCountdowns = [...countdowns].sort((a, b) => {
    const aTime = new Date(a.targetDate).getTime();
    const bTime = new Date(b.targetDate).getTime();
    const nowTime = now.getTime();

    const aEnded = aTime < nowTime;
    const bEnded = bTime < nowTime;

    if (aEnded && !bEnded) return 1;
    if (!aEnded && bEnded) return -1;

    return aTime - bTime;
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading countdowns...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Permission Banner */}
      {(isDefault || isDenied) && countdowns.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Browser Notifications</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              {isDefault
                ? 'Enable notifications to receive reminders even when this tab is in the background.'
                : 'Notifications are blocked. You can still see in-app reminders.'}
            </span>
            {isDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={requestPermission}
                className="ml-4"
              >
                <Bell className="h-4 w-4 mr-2" />
                Enable
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Countdowns</h1>
          <p className="text-muted-foreground mt-1">
            Track important events and never miss a moment
          </p>
        </div>
        <Button onClick={handleCreate} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          New Countdown
        </Button>
      </div>

      {/* Notification Status */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {permission === 'granted' ? (
          <>
            <Bell className="h-4 w-4 text-primary" />
            <span>Notifications enabled</span>
          </>
        ) : (
          <>
            <BellOff className="h-4 w-4" />
            <span>Notifications disabled</span>
          </>
        )}
      </div>

      {/* Countdowns Grid */}
      {sortedCountdowns.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <div className="max-w-md mx-auto space-y-4">
            <div className="text-6xl">⏰</div>
            <h2 className="text-2xl font-semibold">No countdowns yet</h2>
            <p className="text-muted-foreground">
              Create your first countdown to start tracking important events
            </p>
            <Button onClick={handleCreate} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Countdown
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCountdowns.map((countdown) => (
            <CountdownCard
              key={countdown.id}
              countdown={countdown}
              now={now}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <CountdownFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editingCountdown={editingCountdown}
      />
    </div>
  );
}

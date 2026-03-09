import { useState, useEffect } from 'react';
import { CountdownEvent, EventType, ReminderSettings } from './types';
import { validateCountdown } from './validation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { eventThemes } from './eventThemes';
import { Plus, Trash2 } from 'lucide-react';

interface CountdownFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (countdown: CountdownEvent) => void;
  editingCountdown?: CountdownEvent;
}

const reminderPresets = [
  { label: 'At event time', offsetMinutes: 0 },
  { label: '5 minutes before', offsetMinutes: 5 },
  { label: '15 minutes before', offsetMinutes: 15 },
  { label: '30 minutes before', offsetMinutes: 30 },
  { label: '1 hour before', offsetMinutes: 60 },
  { label: '1 day before', offsetMinutes: 1440 },
  { label: '1 week before', offsetMinutes: 10080 },
];

export function CountdownFormDialog({
  open,
  onOpenChange,
  onSave,
  editingCountdown,
}: CountdownFormDialogProps) {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [eventType, setEventType] = useState<EventType>('custom');
  const [reminders, setReminders] = useState<ReminderSettings[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingCountdown) {
      setTitle(editingCountdown.title);
      setTargetDate(editingCountdown.targetDate.slice(0, 16)); // Format for datetime-local
      setNotes(editingCountdown.notes || '');
      setEventType(editingCountdown.eventType);
      setReminders(editingCountdown.reminders);
    } else {
      setTitle('');
      setTargetDate('');
      setNotes('');
      setEventType('custom');
      setReminders([]);
    }
    setErrors({});
  }, [editingCountdown, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCountdown(title, targetDate, reminders);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    const countdown: CountdownEvent = {
      id: editingCountdown?.id || `countdown-${Date.now()}-${Math.random()}`,
      title: title.trim(),
      targetDate: new Date(targetDate).toISOString(),
      notes: notes.trim(),
      eventType,
      reminders,
      createdAt: editingCountdown?.createdAt || new Date().toISOString(),
    };

    onSave(countdown);
    onOpenChange(false);
  };

  const addReminder = () => {
    setReminders([
      ...reminders,
      { enabled: true, offsetMinutes: 60, label: '1 hour before' },
    ]);
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const updateReminder = (index: number, updates: Partial<ReminderSettings>) => {
    setReminders(
      reminders.map((reminder, i) =>
        i === index ? { ...reminder, ...updates } : reminder
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCountdown ? 'Edit Countdown' : 'Create New Countdown'}
          </DialogTitle>
          <DialogDescription>
            Set up your countdown event with reminders to stay on track.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sarah's Birthday Party"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date & Time *</Label>
            <Input
              id="targetDate"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className={errors.targetDate ? 'border-destructive' : ''}
            />
            {errors.targetDate && (
              <p className="text-sm text-destructive">{errors.targetDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
              <SelectTrigger id="eventType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(eventThemes).map(([key, theme]) => (
                  <SelectItem key={key} value={key}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Reminders</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReminder}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Reminder
              </Button>
            </div>

            {reminders.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No reminders set. Add one to get notified before your event.
              </p>
            )}

            {reminders.map((reminder, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
              >
                <Switch
                  checked={reminder.enabled}
                  onCheckedChange={(enabled) =>
                    updateReminder(index, { enabled })
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <Select
                    value={reminder.offsetMinutes.toString()}
                    onValueChange={(value) => {
                      const preset = reminderPresets.find(
                        (p) => p.offsetMinutes === parseInt(value)
                      );
                      updateReminder(index, {
                        offsetMinutes: parseInt(value),
                        label: preset?.label || `${value} minutes before`,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderPresets.map((preset) => (
                        <SelectItem
                          key={preset.offsetMinutes}
                          value={preset.offsetMinutes.toString()}
                        >
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeReminder(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingCountdown ? 'Save Changes' : 'Create Countdown'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

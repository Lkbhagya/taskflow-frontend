import { CheckCircle2, Circle, ClipboardList, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TaskStats } from '@/types/task';

interface TaskStatsCardsProps {
  stats: TaskStats;
}

const STAT_ITEMS = [
  { key: 'total', label: 'Total Tasks', icon: ClipboardList },
  { key: 'open', label: 'Open Tasks', icon: Circle },
  { key: 'inProgress', label: 'In Progress Tasks', icon: LoaderCircle },
  { key: 'completed', label: 'Completed Tasks', icon: CheckCircle2 },
] as const;

export function TaskStatsCards({ stats }: TaskStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAT_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats[item.key]}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

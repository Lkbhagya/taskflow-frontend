import { useEffect, useState } from 'react';
import { RecentTasksList } from '@/components/task/RecentTasksList';
import { TaskStatsCards } from '@/components/task/TaskStatsCards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UnassignedTasksList } from '@/pages/dashboard/UnassignedTasksList';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService, type DashboardResponse } from '@/services/dashboardService';
import type { Task } from '@/types/task';

const emptyStats = {
  total: 0,
  open: 0,
  inProgress: 0,
  completed: 0,
};

export function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await dashboardService.getDashboard();
        if (mounted) setDashboard(data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to load dashboard.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = dashboard?.stats ?? emptyStats;
  const recentTasks: Task[] = dashboard?.recentTasks ?? [];
  const unassignedTasks: Task[] = dashboard?.unassignedTasks ?? [];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-foreground">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Overview of your workflow{user ? `, ${user.name}` : ''}.
        </p>
      </header>

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground shadow-sm">
          Loading dashboard...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive">
          {error}
        </div>
      ) : (
        <>
          <TaskStatsCards stats={stats} />

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Unassigned Tasks</CardTitle>
                <CardDescription>Tasks without assignment, with due date, priority, and status.</CardDescription>
              </CardHeader>
              <CardContent>
                <UnassignedTasksList tasks={unassignedTasks} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{user?.role === 'ADMIN' ? 'Recent Team Tasks' : 'My Recent Tasks'}</CardTitle>
                <CardDescription>Latest task activity and assignment status.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTasksList tasks={recentTasks} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </section>
  );
}

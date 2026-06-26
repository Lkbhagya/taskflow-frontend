import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserWorkload {
  assigned: number;
  completed: number;
  pending: number;
}

interface Props {
  workload: UserWorkload;
}

export function UserDashboardSection({ workload }: Props) {
  const workloadItems = [
    { label: 'Assigned Tasks', value: workload.assigned },
    { label: 'Completed Tasks', value: workload.completed },
    { label: 'Pending Tasks', value: workload.pending },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-normal">My Workload</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {workloadItems.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

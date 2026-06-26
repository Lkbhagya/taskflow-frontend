import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskDistribution {
  label: string;
  count: number;
}

interface Props {
  taskDistribution: TaskDistribution[];
}

export function AdminDashboardSection({ taskDistribution }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-normal">Team Task Distribution</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {taskDistribution.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{item.count}</p>
              <p className="text-sm text-muted-foreground">Tasks</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

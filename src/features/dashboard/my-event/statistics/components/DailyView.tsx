import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventStatistics } from "@/types/eventStatistic";

interface DailyViewProps {
  data: EventStatistics[]; // Pastikan tipe data yang diterima
}

export function DailyView({ data }: DailyViewProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((event) => (
          <Card key={event.eventId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Title</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{event.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold vs Transactions</CardTitle>
          <CardDescription>
            Comparison of tickets sold and actual transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalTicketsSold"
                fill="#8884d8"
                name="Tickets Sold"
              />
              <Bar
                dataKey="totalTransactions"
                fill="#82ca9d"
                name="Transactions"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

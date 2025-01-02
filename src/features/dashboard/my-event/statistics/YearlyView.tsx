// YearlyView.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventStatistics } from "@/types/eventStatistic";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface YearlyViewProps {
  data: EventStatistics[];
}

export function YearlyView({ data }: YearlyViewProps) {
  const totalRevenue = data.reduce((acc, event) => acc + event.totalRevenue, 0);
  const totalTicketsSold = data.reduce(
    (acc, event) => acc + event.totalTicketsSold,
    0,
  );
  const totalTransactions = data.reduce(
    (acc, event) => acc + event.totalTransactions,
    0,
  );

  const monthlyRevenueData = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "long" }),
    revenue: data.reduce((acc, event) => {
      const eventDate = new Date(event.startTime); // Pastikan startTime adalah tanggal
      return eventDate.getMonth() === i ? acc + event.totalRevenue : acc;
    }, 0),
  }));

  const ticketsSoldData = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "long" }),
    ticketsSold: data.reduce((acc, event) => {
      const eventDate = new Date(event.startTime); // Pastikan startTime adalah tanggal
      return eventDate.getMonth() === i ? acc + event.totalTicketsSold : acc;
    }, 0),
  }));

  const transactionsData = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "long" }),
    transactions: data.reduce((acc, event) => {
      const eventDate = new Date(event.startTime); // Pastikan startTime adalah tanggal
      return eventDate.getMonth() === i ? acc + event.totalTransactions : acc;
    }, 0),
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tickets Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTicketsSold.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTransactions.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue trend throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold vs Transactions</CardTitle>
          <CardDescription>
            Comparison of tickets sold and actual transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsSoldData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ticketsSold" fill="#8884d8" name="Tickets Sold" />
              <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

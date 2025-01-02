// statisticPage.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useGetEventStatistics from "@/hooks/api/statistic/useGetEventsStatistics";
import { YearlyView } from "./YearlyView";
import { MonthlyView } from "./MonthlyView";
import { DailyView } from "./DailyView";

const StatisticPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  // Mengambil data untuk tampilan harian
  const {
    data: dailyData,
    isLoading: isLoadingDaily,
    error: errorDaily,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
    month: (selectedMonth + 1).toString(), // Menyesuaikan bulan ke format 1-12
    day: selectedDay.toString(),
  });

  // Mengambil data untuk tampilan bulanan
  const {
    data: monthlyData,
    isLoading: isLoadingMonthly,
    error: errorMonthly,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
    month: (selectedMonth + 1).toString(),
  });

  // Mengambil data untuk tampilan tahunan
  const {
    data: yearlyData,
    isLoading: isLoadingYearly,
    error: errorYearly,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await useGetEventStatistics({
          year: selectedYear.toString(),
          month: (selectedMonth + 1).toString(),
          day: selectedDay.toString(),
        });
        // Lakukan sesuatu dengan data yang diterima
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold sm:text-3xl">
        Event Statistics Dashboard
      </h1>
      <Tabs defaultValue="yearly" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Yearly Statistics
              </CardTitle>
              <CardDescription>
                Event data for the year {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="mb-4 w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(5)].map((_, i) => (
                    <SelectItem
                      key={i}
                      value={(new Date().getFullYear() - i).toString()}
                    >
                      {new Date().getFullYear() - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isLoadingYearly ? (
                <p>Loading...</p>
              ) : errorYearly ? (
                <p>Error: {errorYearly.message}</p>
              ) : yearlyData ? (
                <YearlyView data={yearlyData} />
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Monthly Statistics
              </CardTitle>
              <CardDescription>
                Event data for{" "}
                {new Date(selectedYear, selectedMonth).toLocaleString(
                  "default",
                  { month: "long", year: "numeric" },
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Select
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(5)].map((_, i) => (
                      <SelectItem
                        key={i}
                        value={(new Date().getFullYear() - i).toString()}
                      >
                        {new Date().getFullYear() - i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {isLoadingMonthly ? (
                <p>Loading...</p>
              ) : errorMonthly ? (
                <p>Error: {errorMonthly.message}</p>
              ) : monthlyData ? (
                <MonthlyView data={monthlyData} />
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Daily Statistics
              </CardTitle>
              <CardDescription>
                Event data for{" "}
                {new Date(
                  selectedYear,
                  selectedMonth,
                  selectedDay,
                ).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Select
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(5)].map((_, i) => (
                      <SelectItem
                        key={i}
                        value={(new Date().getFullYear() - i).toString()}
                      >
                        {new Date().getFullYear() - i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedDay(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(31)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {isLoadingDaily ? (
                <p>Loading...</p>
              ) : errorDaily ? (
                <p>Error: {errorDaily.message}</p>
              ) : dailyData ? (
                <DailyView data={dailyData} />
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticPage;

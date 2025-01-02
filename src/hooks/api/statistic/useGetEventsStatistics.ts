// hooks/api/statistic/useGetEventsStatistics.ts
"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventStatistics } from "@/types/eventStatistic"; // Import interface EventStatistics dari types/eventStatistic.ts

interface GetEventStatisticsParams {
  year?: string;
  month?: string;
  day?: string;
}

const useGetEventStatistics = ({
  year,
  month,
  day,
}: GetEventStatisticsParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<EventStatistics[], AxiosError>({
    queryKey: ["statistics", { year, month, day }],
    queryFn: async () => {
      const response = await axiosInstance.get<EventStatistics[]>(
        "/statistics",
        {
          params: { year, month, day },
        },
      );
      return response.data;
    },
    enabled: !!year || !!month || !!day,
  });
};

export default useGetEventStatistics;

import { AllStatisticsQuery } from "../graphql/generated/graphql-gen";

export type StatisticsDashboardProps = {
  data: AllStatisticsQuery;
};

export type FishStatisticsProps = {
  items: AllStatisticsQuery['allFishStatistics'];
};

export type AttendanceStatisticsProps = {
  items: AllStatisticsQuery['allAttendanceStatistics'];
};

export type FishingGroundStatisticsProps = {
  items: AllStatisticsQuery['allFishingGroundCatchStatistics'];
};
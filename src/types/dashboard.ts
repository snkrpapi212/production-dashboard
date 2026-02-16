export type DateRange = {
  from: Date;
  to: Date;
};

export type FilterState = {
  dateRange: DateRange;
  categories: string[];
  status: string[];
  regions: string[];
};

export type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
};

export type DashboardLayout = {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
};

export type KPIData = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease' | 'unchanged';
  sparkline: { date: string; value: number }[];
};

export type ChartData = {
  date: string;
  "Revenue": number;
  "Profit": number;
};

export type UserAcquisitionData = {
  name: string;
  "Active Users": number;
  "New Signups": number;
};

export type CustomerData = {
  id: string;
  name: string;
  revenue: number;
  status: 'active' | 'churned' | 'pending';
  region: string;
};

export type GeoData = {
  name: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info';
};

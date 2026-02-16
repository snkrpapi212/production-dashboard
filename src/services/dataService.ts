import { KPIData, ChartData, UserAcquisitionData, CustomerData, GeoData, ActivityItem, FilterState } from '../types/dashboard';

const CACHE_TTL = 60000; // 1 minute
const cache = new Map<string, { data: any; timestamp: number }>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getCacheKey = (type: string, filters: FilterState) => {
  return `${type}-${JSON.stringify(filters)}`;
};

export const dataService = {
  async getKPIData(filters: FilterState): Promise<KPIData> {
    const key = getCacheKey('kpi', filters);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    await sleep(800); // Simulate network latency

    const data: KPIData = {
      title: "Monthly Recurring Revenue",
      metric: "$72,450",
      progress: 72,
      target: "$100,000",
      delta: "12.5%",
      deltaType: "increase",
      sparkline: Array.from({ length: 20 }, (_, i) => ({
        date: `2024-01-${i + 1}`,
        value: Math.floor(Math.random() * 1000) + 5000,
      })),
    };

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  },

  async getRevenueTrend(filters: FilterState): Promise<ChartData[]> {
    const key = getCacheKey('revenue-trend', filters);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    await sleep(1200);

    const data: ChartData[] = Array.from({ length: 12 }, (_, i) => ({
      date: `Month ${i + 1}`,
      "Revenue": Math.floor(Math.random() * 50000) + 20000,
      "Profit": Math.floor(Math.random() * 20000) + 5000,
    }));

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  },

  async getUserAcquisition(filters: FilterState): Promise<UserAcquisitionData[]> {
    const key = getCacheKey('user-acquisition', filters);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    await sleep(1000);

    const data: UserAcquisitionData[] = [
      { name: "Direct", "Active Users": 4500, "New Signups": 1200 },
      { name: "Referral", "Active Users": 3200, "New Signups": 800 },
      { name: "Social", "Active Users": 2800, "New Signups": 600 },
      { name: "Organic", "Active Users": 5400, "New Signups": 1500 },
    ];

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  },

  async getTopCustomers(filters: FilterState): Promise<CustomerData[]> {
    const key = getCacheKey('top-customers', filters);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    await sleep(900);

    const data: CustomerData[] = [
      { id: "1", name: "Acme Corp", revenue: 15200, status: 'active', region: 'North America' },
      { id: "2", name: "Globex Ltd", revenue: 12400, status: 'active', region: 'Europe' },
      { id: "3", name: "Soylent Inc", revenue: 9800, status: 'pending', region: 'Asia' },
      { id: "4", name: "Initech", revenue: 7600, status: 'active', region: 'North America' },
      { id: "5", name: "Umbrella Corp", revenue: 5400, status: 'churned', region: 'South America' },
    ];

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  },

  async getGeoDistribution(filters: FilterState): Promise<GeoData[]> {
    const key = getCacheKey('geo', filters);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    await sleep(1100);

    const data: GeoData[] = [
      { name: "USA", value: 45 },
      { name: "Germany", value: 22 },
      { name: "UK", value: 18 },
      { name: "Japan", value: 10 },
      { name: "Others", value: 5 },
    ];

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  },

  async getActivityFeed(): Promise<ActivityItem[]> {
    await sleep(500);
    return [
      { id: "1", user: "John Doe", action: "Upgraded plan", time: "2 mins ago", status: 'success' },
      { id: "2", user: "Alice Smith", action: "New signup", time: "15 mins ago", status: 'info' },
      { id: "3", user: "System", action: "Database backup completed", time: "1 hour ago", status: 'success' },
      { id: "4", user: "Bob Johnson", action: "Payment failed", time: "2 hours ago", status: 'warning' },
      { id: "5", user: "Jane Doe", action: "Invited new member", time: "5 hours ago", status: 'info' },
    ];
  }
};

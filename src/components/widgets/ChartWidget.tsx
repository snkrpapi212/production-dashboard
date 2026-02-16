import React, { useEffect, useState } from 'react';
import { Card, Title, AreaChart } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { ChartData } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const ChartWidget: React.FC = () => {
  const { filters, refreshCount } = useFilters();
  const [data, setData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getRevenueTrend(filters);
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters, refreshCount]);

  if (loading || !data) return <WidgetSkeleton />;

  return (
    <Card className="h-full">
      <Title>Revenue Trend</Title>
      <AreaChart
        className="mt-4 h-72"
        data={data}
        index="date"
        categories={["Revenue", "Profit"]}
        colors={["blue", "cyan"]}
        valueFormatter={(number: number) => `$${Intl.NumberFormat("us").format(number).toString()}`}
      />
    </Card>
  );
};

export default ChartWidget;

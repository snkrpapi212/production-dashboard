import React, { useEffect, useState } from 'react';
import { Card, Title, BarChart } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { UserAcquisitionData } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const AcquisitionWidget: React.FC = () => {
  const { filters, refreshCount } = useFilters();
  const [data, setData] = useState<UserAcquisitionData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getUserAcquisition(filters);
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
      <Title>User Acquisition</Title>
      <BarChart
        className="mt-4 h-72"
        data={data}
        index="name"
        categories={["Active Users", "New Signups"]}
        colors={["indigo", "teal"]}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default AcquisitionWidget;

import React, { useEffect, useState } from 'react';
import { Card, Metric, Text, Flex, BadgeDelta, ProgressBar } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { KPIData } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const KPIWidget: React.FC = () => {
  const { filters, refreshCount } = useFilters();
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getKPIData(filters);
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
      <Text>{data.title}</Text>
      <Flex justifyContent="start" alignItems="baseline" className="space-x-3">
        <Metric>{data.metric}</Metric>
        <BadgeDelta deltaType={data.deltaType}>{data.delta}</BadgeDelta>
      </Flex>
      <Flex className="mt-6">
        <Text>Target: {data.target}</Text>
        <Text>{data.progress}%</Text>
      </Flex>
      <ProgressBar value={data.progress} color="blue" className="mt-2" />
    </Card>
  );
};

export default KPIWidget;

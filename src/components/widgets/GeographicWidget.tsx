import React, { useEffect, useState } from 'react';
import { Card, Title, DonutChart, List, ListItem, Text, Flex } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { GeoData } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const GeographicWidget: React.FC = () => {
  const { filters, refreshCount } = useFilters();
  const [data, setData] = useState<GeoData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getGeoDistribution(filters);
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
      <Title>Geographic Distribution</Title>
      <Flex className="mt-4" flexDirection="col">
        <DonutChart
          data={data}
          category="value"
          index="name"
          colors={["blue", "cyan", "indigo", "violet", "slate"]}
          className="h-40"
        />
        <List className="mt-4 w-full">
          {data.map((item) => (
            <ListItem key={item.name}>
              <span>{item.name}</span>
              <Text>{item.value}%</Text>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Card>
  );
};

export default GeographicWidget;

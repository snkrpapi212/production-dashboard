import React, { useEffect, useState } from 'react';
import { Card, Title, List, ListItem, Badge, Text } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { ActivityItem } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const ActivityFeedWidget: React.FC = () => {
  const { refreshCount } = useFilters();
  const [data, setData] = useState<ActivityItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getActivityFeed();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Simulate "real-time" updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  if (loading || !data) return <WidgetSkeleton />;

  return (
    <Card className="h-full overflow-y-auto">
      <Title>Real-time Activity</Title>
      <List className="mt-4">
        {data.map((item) => (
          <ListItem key={item.id} className="flex flex-col items-start space-y-1 py-3">
            <div className="flex justify-between w-full">
              <Text className="font-medium text-slate-900">{item.user}</Text>
              <Text className="text-xs">{item.time}</Text>
            </div>
            <div className="flex justify-between w-full items-center">
              <Text className="text-sm truncate pr-2">{item.action}</Text>
              <Badge color={item.status === 'success' ? 'emerald' : item.status === 'warning' ? 'amber' : 'blue'} size="xs">
                {item.status}
              </Badge>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ActivityFeedWidget;

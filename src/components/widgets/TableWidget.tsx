import React, { useEffect, useState } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Badge } from '@tremor/react';
import { useFilters } from '../../context/FilterContext';
import { dataService } from '../../services/dataService';
import { CustomerData } from '../../types/dashboard';
import { WidgetSkeleton } from '../Skeleton';

const TableWidget: React.FC = () => {
  const { filters, refreshCount } = useFilters();
  const [data, setData] = useState<CustomerData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dataService.getTopCustomers(filters);
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters, refreshCount]);

  if (loading || !data) return <WidgetSkeleton />;

  return (
    <Card className="h-full overflow-hidden">
      <Title>Top Customers</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Revenue</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>${item.revenue.toLocaleString()}</Text>
              </TableCell>
              <TableCell>
                <Badge color={item.status === 'active' ? 'emerald' : item.status === 'pending' ? 'amber' : 'red'}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{item.region}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableWidget;

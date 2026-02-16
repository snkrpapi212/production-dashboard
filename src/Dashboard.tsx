import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { FilterProvider } from './context/FilterContext';
import GlobalControls from './components/GlobalControls';
import ErrorBoundary from './components/ErrorBoundary';

import KPIWidget from './components/widgets/KPIWidget';
import ChartWidget from './components/widgets/ChartWidget';
import AcquisitionWidget from './components/widgets/AcquisitionWidget';
import TableWidget from './components/widgets/TableWidget';
import GeographicWidget from './components/widgets/GeographicWidget';
import ActivityFeedWidget from './components/widgets/ActivityFeedWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const INITIAL_LAYOUTS = {
  lg: [
    { i: 'kpi', x: 0, y: 0, w: 4, h: 4, minW: 3, minH: 3 },
    { i: 'acquisition', x: 4, y: 0, w: 4, h: 4, minW: 3, minH: 3 },
    { i: 'geo', x: 8, y: 0, w: 4, h: 4, minW: 3, minH: 3 },
    { i: 'chart', x: 0, y: 4, w: 8, h: 6, minW: 4, minH: 4 },
    { i: 'activity', x: 8, y: 4, w: 4, h: 6, minW: 2, minH: 4 },
    { i: 'table', x: 0, y: 10, w: 12, h: 6, minW: 6, minH: 4 },
  ],
  md: [
    { i: 'kpi', x: 0, y: 0, w: 5, h: 4 },
    { i: 'acquisition', x: 5, y: 0, w: 5, h: 4 },
    { i: 'geo', x: 0, y: 4, w: 4, h: 4 },
    { i: 'chart', x: 4, y: 4, w: 6, h: 6 },
    { i: 'activity', x: 0, y: 10, w: 10, h: 4 },
    { i: 'table', x: 0, y: 14, w: 10, h: 6 },
  ],
  sm: [
    { i: 'kpi', x: 0, y: 0, w: 6, h: 4 },
    { i: 'acquisition', x: 0, y: 4, w: 6, h: 4 },
    { i: 'geo', x: 0, y: 8, w: 6, h: 4 },
    { i: 'chart', x: 0, y: 12, w: 6, h: 6 },
    { i: 'activity', x: 0, y: 18, w: 6, h: 4 },
    { i: 'table', x: 0, y: 22, w: 6, h: 6 },
  ]
};

const DashboardContent: React.FC = () => {
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('dashboard-layout');
    return saved ? JSON.parse(saved) : INITIAL_LAYOUTS;
  });

  const handleLayoutChange = useCallback((_: any, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboard-layout', JSON.stringify(allLayouts));
  }, []);

  const handleReset = useCallback(() => {
    setLayouts(INITIAL_LAYOUTS);
    localStorage.removeItem('dashboard-layout');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GlobalControls onReset={handleReset} />
      
      <main className="flex-grow p-4 overflow-x-hidden">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          draggableHandle=".drag-handle"
          onLayoutChange={handleLayoutChange}
        >
          <div key="kpi">
            <WidgetWrapper title="Revenue Overview">
              <KPIWidget />
            </WidgetWrapper>
          </div>
          <div key="acquisition">
            <WidgetWrapper title="User Growth">
              <AcquisitionWidget />
            </WidgetWrapper>
          </div>
          <div key="geo">
            <WidgetWrapper title="Geography">
              <GeographicWidget />
            </WidgetWrapper>
          </div>
          <div key="chart">
            <WidgetWrapper title="Revenue Deep Dive">
              <ChartWidget />
            </WidgetWrapper>
          </div>
          <div key="activity">
            <WidgetWrapper title="Live Updates">
              <ActivityFeedWidget />
            </WidgetWrapper>
          </div>
          <div key="table">
            <WidgetWrapper title="Customer Portfolio">
              <TableWidget />
            </WidgetWrapper>
          </div>
        </ResponsiveGridLayout>
      </main>
    </div>
  );
};

const WidgetWrapper: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <ErrorBoundary>
    <div className="h-full flex flex-col group relative" title={title}>
      <div className="drag-handle absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10 bg-white/80 rounded border border-gray-200">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
      <div className="flex-grow h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
        {children}
      </div>
    </div>
  </ErrorBoundary>
);

const Dashboard: React.FC = () => (
  <FilterProvider>
    <DashboardContent />
  </FilterProvider>
);

export default Dashboard;

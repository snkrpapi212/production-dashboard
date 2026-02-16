# Production-Grade SaaS Analytics Dashboard

A comprehensive, customizable, and production-ready analytics dashboard built with React, Tremor, and react-grid-layout.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **UI Components**: [@tremor/react](https://www.tremor.so/)
- **Grid System**: [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Features

1. **Customizable Layout**: Drag-and-drop, resize, and reposition widgets. Layouts are persisted to `localStorage` and adapt to screen sizes (LG, MD, SM).
2. **Widget Catalog**:
   - **Revenue KPI**: Metric with delta indicator, sparkline, and progress bar.
   - **Revenue Trend**: Multi-category Area Chart.
   - **User Acquisition**: Comparative Bar Chart.
   - **Top Customers**: Sortable data table with status badges.
   - **Geographic Distribution**: Donut chart with breakdown list.
   - **Real-time Activity**: Auto-updating feed of system events.
3. **Global Controls**:
   - Integrated Date Range Picker affecting all data widgets.
   - Multi-select filters for Categories and Regions.
   - Manual Refresh and Auto-refresh (1m interval) toggle.
   - Layout Reset to restore defaults.
   - Mock Export functionality.
4. **Production Readiness**:
   - **Error Boundaries**: Each widget is isolated; failures show a retry UI without crashing the dashboard.
   - **Loading States**: Shimmer skeletons displayed during "API" calls.
   - **Data Caching**: 1-minute TTL for API responses to optimize performance.
   - **Responsive Design**: Custom breakpoints for desktop, tablet, and mobile.
   - **Type Safety**: Fully typed props and data models.

## Structure

```text
src/
├── components/
│   ├── widgets/        # Tremor-based widget implementations
│   ├── ErrorBoundary.tsx
│   ├── GlobalControls.tsx
│   └── Skeleton.tsx
├── context/
│   └── FilterContext.tsx # Global state for filters and coordination
├── services/
│   └── dataService.ts   # Mock API layer with caching and simulation
├── types/
│   └── dashboard.ts    # TypeScript interfaces
├── Dashboard.tsx       # Main grid layout and persistence logic
└── index.css           # Tailwind and grid styles
```

## Setup & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Tailwind**:
   Ensure `tailwind.config.js` includes the Tremor and headlessui plugins as configured in this project.

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## Customization

To add a new widget:
1. Define the data interface in `src/types/dashboard.ts`.
2. Add a mock fetching method in `src/services/dataService.ts`.
3. Create the component in `src/components/widgets/`.
4. Add it to the `INITIAL_LAYOUTS` and `ResponsiveGridLayout` children in `src/Dashboard.tsx`.

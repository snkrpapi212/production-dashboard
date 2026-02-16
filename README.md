# Production-Grade SaaS Analytics Dashboard

A comprehensive, customizable, and production-ready analytics dashboard built with React, Tremor, and react-grid-layout.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite
- **UI Components**: [@tremor/react](https://www.tremor.so/)
- **Grid System**: [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Setup & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Features

1. **Customizable Layout**: Drag-and-drop, resize, and reposition widgets. Layouts are persisted to `localStorage` and adapt to screen sizes.
2. **Widget Catalog**:
   - **Revenue KPI**: Metric with delta indicator and progress bar.
   - **Revenue Trend**: Multi-category Area Chart.
   - **User Acquisition**: Comparative Bar Chart.
   - **Top Customers**: Sortable data table with status badges.
   - **Geographic Distribution**: Donut chart with breakdown list.
   - **Real-time Activity**: Auto-updating feed of system events.
3. **Global Controls**: Integrated Date Range Picker and filters affecting all data widgets.
4. **Production Readiness**: Error Boundaries, Loading Skeletons, and Widget-level Caching.

# Production-Grade SaaS Analytics Dashboard

A comprehensive, customizable, and production-ready analytics dashboard built with **React**, **Tremor**, and **react-grid-layout**. This dashboard provides real-time insights into SaaS metrics with a fully interactive and responsive user interface.

## 🚀 Key Features

### 1. Customizable Interactive Layout
- **Drag-and-Drop**: Reposition any widget using the drag handle (appears on hover).
- **Dynamic Resizing**: Every widget can be resized to fit your specific needs.
- **Persistence**: Your custom layout is automatically saved to `localStorage` and persists across sessions.
- **Reset Functionality**: Quickly restore the default production layout with one click.

### 2. Widget Catalog
- **Revenue KPI**: Highlights Monthly Recurring Revenue (MRR) with trend indicators, target progress bars, and historical sparklines.
- **Revenue Trend**: A multi-series Area Chart visualizing revenue and profit across time.
- **User Acquisition**: Comparative Bar Chart analyzing growth across Direct, Referral, Social, and Organic channels.
- **Top Customers**: A detailed data table with status badges (Active, Pending, Churned) and regional distribution.
- **Geographic Distribution**: Donut Chart paired with a ranked list of top-performing regions.
- **Live Activity Feed**: An auto-updating feed simulating real-time system events and user actions.

### 3. Global Control Center
- **Smart Filtering**: Integrated Date Range Picker and Multi-select filters (Categories, Regions) that coordinate data updates across all widgets.
- **Theme Support**: Built-in **Dark Mode** support with automatic system preference detection and manual toggle.
- **Refresh Logic**: Supports both manual data refreshing and a 1-minute auto-refresh cycle.

### 4. Production-Grade Architecture
- **Error Boundaries**: Every widget is wrapped in an isolated boundary; if one fails, the others remain functional with an individual retry option.
- **Data Caching**: Implements a 1-minute TTL (Time To Live) cache for API calls to optimize performance and reduce redundant network requests.
- **Responsive Breakpoints**: Tailored layouts for Desktop (1200px+), Tablet (996px+), and Mobile (<768px).
- **Type Safety**: 100% TypeScript implementation for robust development and maintenance.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **UI Components**: [@tremor/react](https://www.tremor.so/)
- **Grid System**: [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Logic**: [Context API](https://react.dev/learn/passing-data-deeply-with-context), [date-fns](https://date-fns.org/)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Create an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## 📂 Project Structure

```text
src/
├── components/
│   ├── widgets/        # Specialized widget implementations
│   ├── ErrorBoundary.tsx # Production error handling
│   ├── GlobalControls.tsx # Header & Filter logic
│   └── Skeleton.tsx    # Loading state UI
├── context/
│   └── FilterContext.tsx # Global state & Theme management
├── services/
│   └── dataService.ts   # Mock API layer with Caching
├── types/
│   └── dashboard.ts    # Centralized TypeScript definitions
├── Dashboard.tsx       # Main Layout Engine
└── index.css           # Global styles & Grid overrides
```

## 🔧 Customization

### Adding a New Widget
1.  **Define Interface**: Add the data model to `src/types/dashboard.ts`.
2.  **Add Mock Data**: Update `src/services/dataService.ts` with a new fetching method.
3.  **Create Component**: Build the UI in `src/components/widgets/` using Tremor components.
4.  **Register Widget**: Add the component and its default position to `src/Dashboard.tsx`.

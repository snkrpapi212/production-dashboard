import React from 'react';
import { MultiSelect, MultiSelectItem, DateRangePicker, Button, Flex, Switch, Text } from '@tremor/react';
import { useFilters } from '../context/FilterContext';
import { RefreshCcw, Download, Trash2, Moon, Sun } from 'lucide-react';

const GlobalControls: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const { filters, setCategories, setRegions, setDateRange, triggerRefresh, darkMode, toggleDarkMode } = useFilters();
  const [autoRefresh, setAutoRefresh] = React.useState(false);

  React.useEffect(() => {
    let interval: any;
    if (autoRefresh) {
      interval = setInterval(triggerRefresh, 60000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, triggerRefresh]);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <Flex className="gap-4 flex-wrap" justifyContent="start">
        <DateRangePicker
          className="max-w-md w-full"
          value={filters.dateRange}
          onValueChange={(val) => setDateRange(val as any)}
        />
        
        <MultiSelect
          className="max-w-xs"
          placeholder="Categories"
          onValueChange={setCategories}
        >
          <MultiSelectItem value="SaaS">SaaS</MultiSelectItem>
          <MultiSelectItem value="Enterprise">Enterprise</MultiSelectItem>
          <MultiSelectItem value="Startup">Startup</MultiSelectItem>
        </MultiSelect>

        <MultiSelect
          className="max-w-xs"
          placeholder="Regions"
          onValueChange={setRegions}
        >
          <MultiSelectItem value="North America">North America</MultiSelectItem>
          <MultiSelectItem value="Europe">Europe</MultiSelectItem>
          <MultiSelectItem value="Asia">Asia</MultiSelectItem>
        </MultiSelect>

        <Flex justifyContent="start" className="w-auto gap-2">
          <Switch checked={autoRefresh} onChange={setAutoRefresh} />
          <Text className="text-sm dark:text-gray-400">Auto-refresh</Text>
        </Flex>

        <Flex className="w-auto gap-2 ml-auto">
          <Button 
            variant="secondary" 
            icon={darkMode ? Sun : Moon} 
            onClick={toggleDarkMode}
            tooltip={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          />
          <Button 
            variant="secondary" 
            icon={RefreshCcw} 
            onClick={triggerRefresh}
            tooltip="Manual Refresh"
          />
          <Button 
            variant="secondary" 
            icon={Download}
            onClick={() => alert("Exporting to PDF...")}
            tooltip="Export PDF"
          />
          <Button 
            variant="light" 
            color="red" 
            icon={Trash2}
            onClick={onReset}
            tooltip="Reset Layout"
          >
            Reset
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default GlobalControls;

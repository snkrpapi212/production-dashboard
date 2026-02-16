import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FilterState, DateRange } from '../types/dashboard';
import { subDays } from 'date-fns';

type FilterContextType = {
  filters: FilterState;
  setCategories: (categories: string[]) => void;
  setRegions: (regions: string[]) => void;
  setDateRange: (range: DateRange) => void;
  refreshCount: number;
  triggerRefresh: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
    categories: [],
    status: [],
    regions: [],
  });

  const [refreshCount, setRefreshCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dashboard-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('dashboard-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('dashboard-theme', 'light');
    }
  }, [darkMode]);

  const setCategories = useCallback((categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  }, []);

  const setRegions = useCallback((regions: string[]) => {
    setFilters(prev => ({ ...prev, regions }));
  }, []);

  const setDateRange = useCallback((dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  }, []);

  const triggerRefresh = useCallback(() => {
    setRefreshCount(prev => prev + 1);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (
    <FilterContext.Provider value={{
      filters,
      setCategories,
      setRegions,
      setDateRange,
      refreshCount,
      triggerRefresh,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
};

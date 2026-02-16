import React, { createContext, useContext, useState, useCallback } from 'react';
import { FilterState, DateRange } from '../types/dashboard';
import { subDays } from 'date-fns';

type FilterContextType = {
  filters: FilterState;
  setCategories: (categories: string[]) => void;
  setRegions: (regions: string[]) => void;
  setDateRange: (range: DateRange) => void;
  refreshCount: number;
  triggerRefresh: () => void;
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

  return (
    <FilterContext.Provider value={{
      filters,
      setCategories,
      setRegions,
      setDateRange,
      refreshCount,
      triggerRefresh
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

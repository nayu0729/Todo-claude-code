import React from 'react';
import { FilterType } from '../../../types/todo';
import { Button } from '../../common';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

const filterLabels: Record<FilterType, string> = {
  all: 'すべて',
  active: '未完了',
  completed: '完了済み',
};

export const FilterBar: React.FC<FilterBarProps> = ({ 
  currentFilter, 
  onFilterChange, 
  activeCount 
}) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="flex gap-2">
        {filters.map(filter => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            isActive={currentFilter === filter}
            onClick={() => onFilterChange(filter)}
          >
            {filterLabels[filter]}
          </Button>
        ))}
      </div>
      
      <div className="text-sm text-gray-600">
        {activeCount > 0 ? (
          <span>残り {activeCount} 件</span>
        ) : (
          <span>すべて完了！</span>
        )}
      </div>
    </div>
  );
};
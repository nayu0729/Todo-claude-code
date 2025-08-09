import React from 'react';
import { Button } from '../../common';

interface FooterProps {
  completedCount: number;
  totalCount: number;
  onClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  completedCount, 
  totalCount, 
  onClearCompleted 
}) => {
  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg mt-6">
      <div className="text-sm text-gray-600">
        {completedCount > 0 ? (
          <span>
            {totalCount} 件中 {completedCount} 件完了
          </span>
        ) : (
          <span>
            {totalCount} 件のタスク
          </span>
        )}
      </div>

      {completedCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearCompleted}
          className="text-gray-600 hover:text-danger"
        >
          完了済みを削除
        </Button>
      )}
    </div>
  );
};
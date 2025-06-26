
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { GeneralApplicationFiltersProps } from './types';

const GeneralApplicationFilters: React.FC<GeneralApplicationFiltersProps> = ({
  searchTerm,
  onSearchChange,
  totalApplications,
  children
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Application Management</CardTitle>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {totalApplications} Total Applications
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default GeneralApplicationFilters;

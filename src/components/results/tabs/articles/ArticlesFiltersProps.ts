
import { ViewMode, FilterType } from '../../types';

export interface ArticlesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  total: number; // Add the required total property
}

export default ArticlesFiltersProps;

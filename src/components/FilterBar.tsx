import { CalendarDays, Factory, ListFilter } from "lucide-react";
import {
  dateOptions,
  fieldGroupOptions,
  plantOptions,
  statusFilterOptions,
} from "../data/mockData";
import type { FieldGroupFilter, StatusFilter } from "../types";

interface FilterBarProps {
  selectedPlant: string;
  selectedPeriod: string;
  selectedGroup: FieldGroupFilter;
  selectedStatus: StatusFilter;
  onPlantChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onGroupChange: (value: FieldGroupFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
}

function FilterBar({
  selectedPlant,
  selectedPeriod,
  selectedGroup,
  selectedStatus,
  onPlantChange,
  onPeriodChange,
  onGroupChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <label>
        <span>
          <Factory size={16} aria-hidden="true" />
          Plant
        </span>
        <select value={selectedPlant} onChange={(event) => onPlantChange(event.target.value)}>
          {plantOptions.map((plant) => (
            <option key={plant} value={plant}>
              {plant}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          <CalendarDays size={16} aria-hidden="true" />
          Reporting period
        </span>
        <select value={selectedPeriod} onChange={(event) => onPeriodChange(event.target.value)}>
          {dateOptions.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          <ListFilter size={16} aria-hidden="true" />
          Field group
        </span>
        <select
          value={selectedGroup}
          onChange={(event) => onGroupChange(event.target.value as FieldGroupFilter)}
        >
          {fieldGroupOptions.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          <ListFilter size={16} aria-hidden="true" />
          Record status
        </span>
        <select
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
        >
          {statusFilterOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default FilterBar;

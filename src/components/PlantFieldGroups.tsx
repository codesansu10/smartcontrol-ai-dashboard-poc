import { Database, SearchX } from "lucide-react";
import { fieldGroupDescriptions, fieldGroupOptions } from "../data/mockData";
import type { FieldGroupFilter, FieldGroupName, PlantField, StatusFilter } from "../types";
import { displayValue, formatFieldName, matchesFieldGroup, matchesStatusFilter } from "../utils/formatters";
import StatusBadge from "./StatusBadge";

interface PlantFieldGroupsProps {
  fields: PlantField[];
  selectedGroup: FieldGroupFilter;
  selectedStatus: StatusFilter;
  compact?: boolean;
}

function PlantFieldGroups({ fields, selectedGroup, selectedStatus, compact = false }: PlantFieldGroupsProps) {
  const visibleFields = fields.filter(
    (field) => matchesFieldGroup(field, selectedGroup) && matchesStatusFilter(field, selectedStatus)
  );
  const groups = fieldGroupOptions.filter((group): group is FieldGroupName => group !== "All");

  if (visibleFields.length === 0) {
    return (
      <section className="empty-state">
        <SearchX size={26} aria-hidden="true" />
        <h4>No records match this filter</h4>
        <p>Try selecting All groups or a broader record status to inspect more plant readings.</p>
      </section>
    );
  }

  return (
    <div className={compact ? "field-groups compact" : "field-groups"}>
      {groups.map((group) => {
        const groupFields = visibleFields.filter((field) => field.group === group);
        if (groupFields.length === 0) return null;

        return (
          <section className="field-group-section" key={group}>
            <div className="section-title-row">
              <Database size={20} aria-hidden="true" />
              <div>
                <h4>{group}</h4>
                <p>{fieldGroupDescriptions[group]}</p>
              </div>
            </div>

            <div className="field-card-grid">
              {groupFields.map((field) => (
                <article className="field-card" key={field.key}>
                  <div className="field-card-head">
                    <span>{formatFieldName(field.key)}</span>
                    <StatusBadge status={field.status} />
                  </div>
                  <strong>{displayValue(field.value)}</strong>
                  <p>{field.description}</p>
                  <div className="field-meta">
                    <span>Expected: {field.expected ?? "Not available"}</span>
                    <span className={field.change?.startsWith("+") ? "delta-up" : field.change?.startsWith("-") ? "delta-down" : ""}>
                      Change: {field.change ?? "Not available"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default PlantFieldGroups;

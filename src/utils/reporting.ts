import {
  activePlantRecord,
  aiExplanation,
  fieldGroupDescriptions,
  OEKOBIT_LOGO_URL,
  plantFields,
  recommendedAction,
} from "../data/mockData";
import type { FieldGroupName, PlantField, RecordStatus } from "../types";
import { formatFieldName } from "./formatters";

type ReportItem = {
  title: string;
  text: string;
};

type DetailItem = {
  label: string;
  value: string;
  status?: RecordStatus;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldsForGroup(group: FieldGroupName) {
  return plantFields.filter((field) => field.group === group);
}

function fieldByKey(key: string) {
  return plantFields.find((field) => field.key === key);
}

function cleanValue(value: PlantField["value"]) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value).replace(/_/g, " ");
}

function hasStructuredValue(value?: string) {
  return Boolean(value && value.trim() && value.toLowerCase() !== "not available");
}

function optionalCell(value?: string) {
  return hasStructuredValue(value) ? escapeHtml(value as string) : '<span class="dash">&mdash;</span>';
}

function statusBadge(status: RecordStatus) {
  return `<span class="status ${status.toLowerCase()}">${escapeHtml(status)}</span>`;
}

function renderDetailTable(items: DetailItem[]) {
  return `
    <table>
      <thead>
        <tr>
          <th>Detail</th>
          <th>Value</th>
          ${items.some((item) => item.status) ? "<th>Status</th>" : ""}
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.label)}</td>
                <td>${escapeHtml(item.value)}</td>
                ${items.some((detail) => detail.status) ? `<td>${item.status ? statusBadge(item.status) : ""}</td>` : ""}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderMonitoringTable(group: FieldGroupName, referenceHeading: string) {
  return `
    <section>
      <h2>${escapeHtml(group)}</h2>
      <p>${escapeHtml(fieldGroupDescriptions[group])}</p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Current Value</th>
            <th>${escapeHtml(referenceHeading)}</th>
            <th>Change</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${fieldsForGroup(group)
            .map(
              (field) => `
                <tr>
                  <td>${escapeHtml(formatFieldName(field.key))}</td>
                  <td>${escapeHtml(cleanValue(field.value))}</td>
                  <td>${optionalCell(field.expected)}</td>
                  <td>${optionalCell(field.change)}</td>
                  <td>${statusBadge(field.status)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderRuleMonitoringSection() {
  return `
    <section>
      <h2>Rule-Based Monitoring</h2>
      <p>${escapeHtml(fieldGroupDescriptions["Rule-Based Monitoring"])}</p>
      <table>
        <thead>
          <tr>
            <th>Alert</th>
            <th>Result</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${fieldsForGroup("Rule-Based Monitoring")
            .map(
              (field) => `
                <tr>
                  <td>${escapeHtml(formatFieldName(field.key))}</td>
                  <td>${escapeHtml(cleanValue(field.value))}</td>
                  <td>${statusBadge(field.status)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAiAnomalySection() {
  return `
    <section>
      <h2>AI Anomaly Detection</h2>
      <p>${escapeHtml(fieldGroupDescriptions["AI Anomaly Detection"])}</p>
      <table>
        <thead>
          <tr>
            <th>AI Output</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${fieldsForGroup("AI Anomaly Detection")
            .map(
              (field) => `
                <tr>
                  <td>${escapeHtml(formatFieldName(field.key))}</td>
                  <td>${escapeHtml(cleanValue(field.value))}</td>
                  <td>${statusBadge(field.status)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderPlantInformation(selectedPlant: string, selectedPeriod: string) {
  const date = fieldByKey("date");
  const dayNumber = fieldByKey("day_number");

  return `
    <section>
      <h2>Plant Information</h2>
      <p>Plant and reporting metadata for the current monitoring snapshot.</p>
      ${renderDetailTable([
        { label: "Date", value: date ? cleanValue(date.value) : activePlantRecord.date },
        { label: "Plant ID", value: selectedPlant.replace(/_/g, " ") },
        { label: "Day Number", value: dayNumber ? cleanValue(dayNumber.value) : "-" },
        { label: "Reporting Period", value: selectedPeriod },
      ])}
    </section>
  `;
}

function renderContextSection() {
  const contextKeys = ["outside_temperature_c", "season", "maintenance_status"];
  const items = contextKeys
    .map((key) => fieldByKey(key))
    .filter((field): field is PlantField => Boolean(field))
    .map((field) => ({
      label: formatFieldName(field.key),
      value: cleanValue(field.value),
      status: field.status,
    }));

  return `
    <section>
      <h2>Context</h2>
      <p>${escapeHtml(fieldGroupDescriptions.Context)}</p>
      ${renderDetailTable(items)}
    </section>
  `;
}

function reportSpecificItems(reportType: string): ReportItem[] {
  if (reportType === "Monthly Expert Reporting Report") {
    return [
      {
        title: "Reporting Scope",
        text: "The report covers the selected plant, reporting period, validated dashboard records, rule alerts, and expert notes needed for release.",
      },
      {
        title: "Data Quality Summary",
        text: "Dashboard records are usable for draft generation, with one manual sample result still marked as missing information.",
      },
      {
        title: "KPI and Issue Summary",
        text: "The key issues are biological instability indicators, reduced gas performance, and elevated compressor maintenance risk.",
      },
      {
        title: "Expert Review and Approval",
        text: "Expert review is required before the customer-facing report is approved and sent.",
      },
      {
        title: "Final Submission / Audit Trail",
        text: "The final version stores source records, flagged issue decisions, approval status, delivery status, and archive timestamp.",
      },
    ];
  }

  if (reportType === "Customer Status Update Report") {
    return [
      {
        title: "Update Trigger",
        text: "The customer update is prepared from the routine status cycle and any validated operational events in the current period.",
      },
      {
        title: "Plant Status Summary",
        text: "The current plant state is anomaly-level, so customer-facing content remains controlled until expert validation is complete.",
      },
      {
        title: "Lifecycle / Maintenance Summary",
        text: "Compressor vibration and overdue maintenance are the main lifecycle signals requiring follow-up.",
      },
      {
        title: "Customer Communication",
        text: "Low-risk updates can be sent automatically; medium, high, or critical content is routed for expert approval first.",
      },
      {
        title: "Action and Outcome Record",
        text: "Sent messages, expert decisions, customer responses, and maintenance outcomes are logged for traceability.",
      },
    ];
  }

  if (reportType === "Full SMARTCONTROL PoC Summary Report") {
    return [
      {
        title: "Three PoC Overview",
        text: "The PoC combines anomaly detection, monthly expert reporting, and standardized customer status updates in one monitoring dashboard.",
      },
      {
        title: "Current Plant Status",
        text: "The selected plant currently requires expert review due to combined biological and equipment risk indicators.",
      },
      {
        title: "Reporting Status",
        text: "The monthly expert report is draft-ready but should be approved after missing information and flagged issues are reviewed.",
      },
      {
        title: "Customer Update Status",
        text: "Customer communication is prepared but routed through review while critical operational context is active.",
      },
      {
        title: "Learning and Audit Trail",
        text: "Expert validation, operator decisions, false alarms, actions, and outcomes are retained as learning and audit records.",
      },
    ];
  }

  return [
    {
      title: "Detection Summary",
      text: "AI analysis identified a critical anomaly pattern involving pH decline, lower methane output, reduced gas flow, high loading, elevated H2S, and compressor stress.",
    },
    {
      title: "Alert Validation",
      text: "The alert is pending OEKOBIT expert validation before it is treated as an operational recommendation.",
    },
    {
      title: "Recommended Action",
      text: recommendedAction,
    },
    {
      title: "Outcome / Learning Record",
      text: "The final expert decision, operator action, and observed outcome will be stored for future threshold and model tuning.",
    },
  ];
}

function renderReportSpecificContent(reportType: string) {
  return `
    <section>
      <h2>Report-Specific Content</h2>
      <div class="narrative-grid">
        ${reportSpecificItems(reportType)
          .map(
            (item) => `
              <article>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderExecutiveSummary() {
  return `
    <section class="executive-summary">
      <h2>Executive Summary</h2>
      <div class="summary-grid">
        <div class="summary-card"><span>Current Plant Status</span><strong>${escapeHtml(activePlantRecord.currentPlantStatus)}</strong></div>
        <div class="summary-card"><span>Risk Level</span><strong>${escapeHtml(activePlantRecord.riskLevel)}</strong></div>
        <div class="summary-card"><span>Anomaly Score</span><strong>${activePlantRecord.anomalyScore.toFixed(2)}</strong></div>
        <div class="summary-card"><span>Expert Review Required</span><strong>${activePlantRecord.expertReviewRequired ? "Yes" : "No"}</strong></div>
        <div class="summary-card wide"><span>Possible Issue Category</span><strong>${escapeHtml(activePlantRecord.possibleIssueCategory)}</strong></div>
        <div class="summary-card wide"><span>Main Recommended Action</span><strong>${escapeHtml(recommendedAction)}</strong></div>
      </div>
      <div class="callout">
        <p>${escapeHtml(aiExplanation)}</p>
      </div>
    </section>
  `;
}

function renderStructuredPlantData(selectedPlant: string, selectedPeriod: string) {
  return `
    <section>
      <h2>Structured Plant Data</h2>
      <p>Grouped monitoring data is shown with section-specific columns so metadata and context fields do not display irrelevant Expected or Change values.</p>
    </section>
    ${renderPlantInformation(selectedPlant, selectedPeriod)}
    ${renderMonitoringTable("Feedstock and Substrate", "Expected / Reference")}
    ${renderMonitoringTable("Anaerobic Digestion Process", "Normal Range")}
    ${renderMonitoringTable("Gas Production and Gas Quality", "Normal Range")}
    ${renderMonitoringTable("Equipment and Operations", "Normal Range")}
    ${renderContextSection()}
    ${renderRuleMonitoringSection()}
    ${renderAiAnomalySection()}
  `;
}

export function buildReportHtml(reportType: string, selectedPlant: string, selectedPeriod: string) {
  const generatedAt = new Date().toLocaleString();
  const displayPlant = selectedPlant.replace(/_/g, " ");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(reportType)}</title>
    <style>
      :root {
        color: #17324a;
        font-family: Inter, Arial, sans-serif;
      }
      body {
        margin: 0;
        background: #f5fbfd;
      }
      .report {
        max-width: 1040px;
        margin: 28px auto;
        background: #ffffff;
        border: 1px solid #d7ebf3;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 24px 70px rgba(54, 175, 220, 0.14);
      }
      header {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 22px;
        align-items: center;
        padding: 28px 32px;
        color: #17324a;
        background: linear-gradient(135deg, #ffffff, #edfaff);
        border-bottom: 1px solid #d7ebf3;
      }
      header img {
        width: 130px;
        padding: 10px;
        border: 1px solid #d7ebf3;
        border-radius: 10px;
        background: #ffffff;
      }
      header h1 {
        margin: 0 0 6px;
        font-size: 28px;
      }
      header p {
        margin: 0;
        color: #5d6f7d;
      }
      .report-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .report-meta span {
        padding: 6px 9px;
        border: 1px solid #d7ebf3;
        border-radius: 999px;
        background: #ffffff;
        color: #17324a;
        font-size: 12px;
        font-weight: 800;
      }
      main {
        padding: 30px 32px 36px;
      }
      section {
        margin-top: 26px;
      }
      section:first-child {
        margin-top: 0;
      }
      h2 {
        margin: 0 0 8px;
        color: #17324a;
        font-size: 18px;
      }
      h3 {
        margin: 0 0 8px;
        color: #17324a;
        font-size: 15px;
      }
      p {
        margin: 0;
        color: #4f6072;
        line-height: 1.55;
      }
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-top: 14px;
      }
      .summary-card,
      .narrative-grid article {
        padding: 14px;
        border: 1px solid #d7ebf3;
        border-radius: 10px;
        background: #f8fdff;
      }
      .summary-card.wide {
        grid-column: span 2;
      }
      .summary-card span {
        display: block;
        color: #5d6f7d;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
      }
      .summary-card strong {
        display: block;
        margin-top: 6px;
        color: #17324a;
        font-size: 16px;
        line-height: 1.4;
      }
      .narrative-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 14px;
      }
      .callout {
        margin-top: 14px;
        padding: 16px;
        border-left: 5px solid #36afdc;
        border-radius: 10px;
        background: #eefafd;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
        border: 1px solid #d7ebf3;
        background: #ffffff;
      }
      th,
      td {
        padding: 11px 12px;
        border-bottom: 1px solid #d7ebf3;
        text-align: left;
        vertical-align: top;
      }
      th {
        color: #5d6f7d;
        background: #eef8fc;
        font-size: 12px;
        text-transform: uppercase;
      }
      .dash {
        color: #94a3af;
      }
      .status {
        display: inline-block;
        padding: 5px 9px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
      }
      .normal { color: #237e31; background: rgba(74, 193, 84, 0.16); }
      .warning { color: #966c00; background: #fff5d6; }
      .critical,
      .anomaly { color: #bc1f32; background: #ffe9ec; }
      footer {
        padding: 18px 32px;
        color: #5d6f7d;
        border-top: 1px solid #d7ebf3;
        background: #f8fdff;
      }
      @media (max-width: 760px) {
        header {
          grid-template-columns: 1fr;
        }
        .summary-grid,
        .narrative-grid {
          grid-template-columns: 1fr;
        }
        .summary-card.wide {
          grid-column: span 1;
        }
      }
      @media print {
        body { background: #ffffff; }
        .report {
          margin: 0;
          max-width: none;
          border: 0;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <article class="report">
      <header>
        <img src="${OEKOBIT_LOGO_URL}" alt="OEKOBIT Biogas" />
        <div>
          <h1>SMARTCONTROL 2.0 AI Dashboard</h1>
          <p>${escapeHtml(reportType)}</p>
          <div class="report-meta">
            <span>Selected plant: ${escapeHtml(displayPlant)}</span>
            <span>Reporting period: ${escapeHtml(selectedPeriod)}</span>
            <span>Generated: ${escapeHtml(generatedAt)}</span>
          </div>
        </div>
      </header>
      <main>
        ${renderExecutiveSummary()}
        ${renderReportSpecificContent(reportType)}
        ${renderStructuredPlantData(displayPlant, selectedPeriod)}
      </main>
      <footer>Generated ${escapeHtml(generatedAt)} from SMARTCONTROL 2.0 AI Dashboard PoC.</footer>
    </article>
  </body>
</html>`;
}

export function downloadReport(reportType: string, selectedPlant: string, selectedPeriod: string) {
  const html = buildReportHtml(reportType, selectedPlant, selectedPeriod);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  const filename = `${reportType.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.html`;
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

export function printReport(reportType: string, selectedPlant: string, selectedPeriod: string) {
  const html = buildReportHtml(reportType, selectedPlant, selectedPeriod);
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=800");

  if (!printWindow) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const fallbackUrl = URL.createObjectURL(blob);
    window.location.href = fallbackUrl;
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

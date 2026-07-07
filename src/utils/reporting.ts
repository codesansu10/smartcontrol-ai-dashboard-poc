import {
  activePlantRecord,
  anomalyBpmnSteps,
  aiExplanation,
  customerStatusBpmnSteps,
  fieldGroupDescriptions,
  monthlyReportingBpmnSteps,
  OEKOBIT_LOGO_URL,
  plantFields,
  recommendedAction,
} from "../data/mockData";
import type { FieldGroupName } from "../types";
import { displayValue, formatFieldName } from "./formatters";

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

export function buildReportHtml(reportType: string, selectedPlant: string, selectedPeriod: string) {
  const generatedAt = new Date().toLocaleString();
  const ruleAlerts = fieldsForGroup("Rule-Based Monitoring");
  const aiFields = fieldsForGroup("AI Anomaly Detection");
  const processSteps =
    reportType === "Monthly Expert Reporting Report"
      ? monthlyReportingBpmnSteps
      : reportType === "Customer Status Update Report"
        ? customerStatusBpmnSteps
        : reportType === "Full SMARTCONTROL PoC Summary Report"
          ? [...anomalyBpmnSteps, ...monthlyReportingBpmnSteps, ...customerStatusBpmnSteps]
          : anomalyBpmnSteps;

  const groupSections = Object.keys(fieldGroupDescriptions)
    .map((group) => {
      const typedGroup = group as FieldGroupName;
      const rows = fieldsForGroup(typedGroup)
        .map(
          (field) => `
            <tr>
              <td>${escapeHtml(formatFieldName(field.key))}</td>
              <td>${escapeHtml(displayValue(field.value))}</td>
              <td>${escapeHtml(field.expected ?? "Not available")}</td>
              <td>${escapeHtml(field.change ?? "Not available")}</td>
              <td><span class="status ${field.status.toLowerCase()}">${escapeHtml(field.status)}</span></td>
            </tr>
          `
        )
        .join("");

      return `
        <section>
          <h2>${escapeHtml(typedGroup)}</h2>
          <p>${escapeHtml(fieldGroupDescriptions[typedGroup])}</p>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Current Value</th>
                <th>Expected</th>
                <th>Change</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");

  const workflowSummary = processSteps
    .map(
      (step, index) => `
        <div class="step">
          <strong>${index + 1}. ${escapeHtml(step.title)}</strong>
          <p>${escapeHtml(step.detail)}</p>
        </div>
      `
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(reportType)}</title>
    <style>
      :root {
        color: #10253f;
        font-family: Inter, Arial, sans-serif;
      }
      body {
        margin: 0;
        background: #f4f7fa;
      }
      .report {
        max-width: 980px;
        margin: 32px auto;
        background: #fff;
        border: 1px solid #d8e2ea;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 24px 70px rgba(16, 37, 63, 0.12);
      }
      header {
        display: flex;
        gap: 22px;
        align-items: center;
        padding: 28px 32px;
        color: #fff;
        background: linear-gradient(135deg, #10253f, #0a395d);
      }
      header img {
        width: 152px;
        padding: 10px;
        border-radius: 10px;
        background: #fff;
      }
      header h1 {
        margin: 0 0 6px;
        font-size: 28px;
      }
      header p {
        margin: 0;
        color: #cde9f2;
      }
      main {
        padding: 30px 32px 36px;
      }
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 26px;
      }
      .summary-card {
        padding: 14px;
        border: 1px solid #d8e2ea;
        border-radius: 10px;
        background: #f8fbfd;
      }
      .summary-card span {
        display: block;
        color: #617287;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .summary-card strong {
        display: block;
        margin-top: 6px;
        font-size: 17px;
      }
      section {
        margin-top: 26px;
      }
      h2 {
        margin: 0 0 8px;
        color: #10253f;
        font-size: 18px;
      }
      p {
        color: #4f6072;
        line-height: 1.55;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
        border: 1px solid #d8e2ea;
      }
      th,
      td {
        padding: 11px 12px;
        border-bottom: 1px solid #d8e2ea;
        text-align: left;
        vertical-align: top;
      }
      th {
        color: #617287;
        background: #eef5f8;
        font-size: 12px;
        text-transform: uppercase;
      }
      .status {
        display: inline-block;
        padding: 5px 9px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
      }
      .normal { color: #126b45; background: #e9f7ef; }
      .warning { color: #966c00; background: #fff5d6; }
      .critical { color: #bc1f32; background: #ffe9ec; }
      .anomaly { color: #10253f; background: #d8f2f9; }
      .callout {
        padding: 16px;
        border-left: 5px solid #25b7d3;
        border-radius: 10px;
        background: #eefafd;
      }
      .step {
        padding: 12px 14px;
        margin-top: 10px;
        border: 1px solid #d8e2ea;
        border-radius: 10px;
        background: #fbfdfe;
      }
      .step p { margin: 5px 0 0; }
      footer {
        padding: 18px 32px;
        color: #617287;
        border-top: 1px solid #d8e2ea;
        background: #f8fbfd;
      }
      @media print {
        body { background: #fff; }
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
          <p>${escapeHtml(reportType)} · Biogas Plant Monitoring, Reporting and Customer Updates</p>
        </div>
      </header>
      <main>
        <div class="summary-grid">
          <div class="summary-card"><span>Selected Plant</span><strong>${escapeHtml(selectedPlant)}</strong></div>
          <div class="summary-card"><span>Reporting Period</span><strong>${escapeHtml(selectedPeriod)}</strong></div>
          <div class="summary-card"><span>Plant Status</span><strong>${escapeHtml(activePlantRecord.currentPlantStatus)}</strong></div>
          <div class="summary-card"><span>Risk Level</span><strong>${escapeHtml(activePlantRecord.riskLevel)}</strong></div>
          <div class="summary-card"><span>Anomaly Score</span><strong>${activePlantRecord.anomalyScore.toFixed(2)}</strong></div>
          <div class="summary-card"><span>AI Result</span><strong>${escapeHtml(activePlantRecord.anomalyStatus)}</strong></div>
          <div class="summary-card"><span>Expert Review Required</span><strong>${activePlantRecord.expertReviewRequired ? "Yes" : "No"}</strong></div>
          <div class="summary-card"><span>Issue Category</span><strong>${escapeHtml(activePlantRecord.possibleIssueCategory)}</strong></div>
        </div>

        <section>
          <h2>Current Plant Status</h2>
          <div class="callout">
            <p>${escapeHtml(aiExplanation)}</p>
          </div>
        </section>

        <section>
          <h2>Rule-Based Alert Summary</h2>
          <table>
            <thead><tr><th>Alert</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              ${ruleAlerts
                .map(
                  (field) => `
                    <tr>
                      <td>${escapeHtml(formatFieldName(field.key))}</td>
                      <td>${escapeHtml(displayValue(field.value))}</td>
                      <td><span class="status ${field.status.toLowerCase()}">${escapeHtml(field.status)}</span></td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>

        <section>
          <h2>AI Anomaly Detection Result</h2>
          <table>
            <thead><tr><th>Field</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              ${aiFields
                .map(
                  (field) => `
                    <tr>
                      <td>${escapeHtml(formatFieldName(field.key))}</td>
                      <td>${escapeHtml(displayValue(field.value))}</td>
                      <td><span class="status ${field.status.toLowerCase()}">${escapeHtml(field.status)}</span></td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Human Decision / Operator Action</h2>
          <p>${escapeHtml(recommendedAction)}</p>
        </section>

        <section>
          <h2>Outcome Documented</h2>
          <p>Outcome is pending expert validation. The final human decision and result will be attached to the relevant PoC record and report.</p>
        </section>

        <section>
          <h2>Learning Feedback</h2>
          <p>Confirmed risks, false alarms, operator actions, and outcomes are stored as learning data for future threshold and model tuning.</p>
        </section>

        <section>
          <h2>Related BPMN Process Steps</h2>
          ${workflowSummary}
        </section>

        ${groupSections}
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

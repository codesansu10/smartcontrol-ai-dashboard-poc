function ReportPreview() {
  return (
    <section className="document-preview">
      <div className="document-header">
        <span>AI-generated draft report preview</span>
        <strong>June 2026</strong>
      </div>
      <div className="document-section">
        <h5>Project Summary</h5>
        <p>Plant performance remained stable overall, with one validated process deviation requiring follow-up.</p>
      </div>
      <div className="document-section">
        <h5>Progress Update</h5>
        <p>Routine monitoring, alert validation, and operator decision records were collected for customer review.</p>
      </div>
      <div className="document-section">
        <h5>Risks & Issues</h5>
        <p>Digester B showed pressure increase, pH decline, and reduced methane concentration.</p>
      </div>
      <div className="document-section warning">
        <h5>Missing Information</h5>
        <p>Manual sample result and operator follow-up note are still required.</p>
      </div>
      <div className="document-section">
        <h5>Recommended Follow-Up Actions</h5>
        <p>Confirm sensor calibration, document operator decision, and include validated outcome in the final report.</p>
      </div>
    </section>
  );
}

export default ReportPreview;

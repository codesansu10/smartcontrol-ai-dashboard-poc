interface KpiCardProps {
  label: string;
  value: string;
  detail: string;
  tone: string;
}

function KpiCard({ label, value, detail, tone }: KpiCardProps) {
  return (
    <article className={`kpi-card tone-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

export default KpiCard;

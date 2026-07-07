import { ShieldCheck } from "lucide-react";

function ResponsibleAICard({ title, text }: { title: string; text: string }) {
  return (
    <article className="responsible-card">
      <ShieldCheck size={20} aria-hidden="true" />
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

export default ResponsibleAICard;

import { Circle, CircleCheck, LoaderCircle } from "lucide-react";
import type { ActivityEntry } from "../types";

function stateIcon(state: ActivityEntry["state"]) {
  if (state === "Complete") return <CircleCheck size={17} aria-hidden="true" />;
  if (state === "Current") return <LoaderCircle size={17} aria-hidden="true" />;
  return <Circle size={17} aria-hidden="true" />;
}

function ActivityLog({ entries }: { entries: ActivityEntry[] }) {
  return (
    <section className="activity-log">
      <div className="section-heading">
        <h4>Outcome documentation and activity log</h4>
        <p>Traceable lifecycle from plant data to documented decision.</p>
      </div>
      <div className="timeline">
        {entries.map((entry) => (
          <article className={`timeline-item state-${entry.state.toLowerCase()}`} key={entry.step}>
            <div className="timeline-icon">{stateIcon(entry.state)}</div>
            <div>
              <div className="timeline-head">
                <strong>{entry.step}</strong>
                <span>{entry.time}</span>
              </div>
              <p>{entry.detail}</p>
              <small>{entry.owner} responsibility</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivityLog;

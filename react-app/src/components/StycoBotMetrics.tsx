import { useEffect, useState } from "react";
import GraphCard from "./graphs/GraphCard";

interface Metric {
  title: string;
  data?: { name: string; value: number }[];
}

export default function StycoBotMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // simulate async API fetch
  useEffect(() => {
    setTimeout(() => {
      setMetrics([
        {
          title: "Users Over Time",
          data: [
            { name: "Jan", value: 12 },
            { name: "Feb", value: 19 },
            { name: "Mar", value: 3 },
            { name: "Apr", value: 5 },
            { name: "May", value: 2 },
            { name: "Jun", value: 3 },
            { name: "Jul", value: 9 },
          ],
        },
        {
          title: "Messages Sent",
          data: [
            { name: "Jan", value: 5 },
            { name: "Feb", value: 10 },
            { name: "Mar", value: 8 },
            { name: "Apr", value: 12 },
            { name: "May", value: 7 },
            { name: "Jun", value: 14 },
            { name: "Jul", value: 9 },
          ],
        },
        {
          title: "Revenue",
          data: [
            { name: "Jan", value: 500 },
            { name: "Feb", value: 700 },
            { name: "Mar", value: 300 },
            { name: "Apr", value: 450 },
            { name: "May", value: 600 },
            { name: "Jun", value: 750 },
            { name: "Jul", value: 900 },
          ],
        },
        // add more metrics — layout adapts automatically
      ]);
    }, 1000);
  }, []);

  const rowCount = Math.ceil(Math.sqrt(metrics.length || 2)); // roughly square grid

  return (
    <div
      className="metrics-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${rowCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gap: "24px",
        padding: "24px",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {metrics.length === 0
        ? Array.from({ length: 2 }).map((_, i) => (
            <GraphCard key={i} title="Loading..." />
          ))
        : metrics.map((metric, i) => (
            <GraphCard key={i} title={metric.title} data={metric.data} />
          ))}
    </div>
  );
}

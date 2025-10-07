import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GraphCardProps {
  title: string;
  data?: { name: string; value: number }[];
}

export default function GraphCard({ title, data }: GraphCardProps) {
  const placeholder = [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 19 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 5 },
    { name: "May", value: 2 },
    { name: "Jun", value: 3 },
    { name: "Jul", value: 9 },
  ];

  return (
    <div
      className="graph-card"
      style={{
        width: "100%",
        maxWidth: "520px",
        height: "380px",
        padding: "24px",
        margin: "16px auto",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      }}
    >
      <h3
        className="graph-title"
        style={{
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "18px",
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data || placeholder} margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              fontSize: "0.9rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={4}
            dot={{ r: 5, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7 }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

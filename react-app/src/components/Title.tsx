interface TitleProps {
  title: string;
  subtitle?: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <span style={styles.gradient}>{title}</span>
      </h1>
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginBottom: "3rem", // matches mb-5
  },
  title: {
    fontSize: "calc(1.425rem + 2.1vw)", // similar to display-5
    fontWeight: 700, // fw-bolder
    margin: 0,
  },
  gradient: {
    display: "inline",
    background: "linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.25rem", // lead
    fontWeight: 300, // fw-light
    marginTop: "0.5rem",
    marginBottom: "1.5rem", // mb-4
    color: "#6c757d",
  },
};

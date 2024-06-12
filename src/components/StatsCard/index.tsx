import { Container, CardStyleType } from "./styles";

type StatsCardTypes = {
  title: string;
  icon: string;
  number?: number;
  total?: number;
  variant?: CardStyleType;
  onClick?: () => void;
};

export function StatsCard({
  title,
  icon,
  onClick,
  number,
  total,
  variant = "neutral",
}: StatsCardTypes) {
  const percentage = number && total ? (number / total) * 100 : null;
  return (
    <Container onClick={onClick} variant={variant}>
      <div>
        <h3>
          {title} ({number && total && `${percentage && percentage.toFixed(2)}`})%
        </h3>
        <p>{number || "-"}</p>
      </div>
      <i className="material-icons">{icon}</i>
    </Container>
  );
}

import { ButtonStyle, Container } from "./styles";
import loadingImg from "../../assets/loading.gif";

type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  loading?: boolean;
  variant?: ButtonStyle;
};

export function Button({
  title,
  type = "submit",
  loading = false,
  variant = "primary",
  onClick,
}: ButtonTypes) {
  return (
    <Container type={type} variant={variant} disabled={loading} onClick={onClick}>
      {loading ? <img src={loadingImg} width={14} /> : title}
    </Container>
  );
}

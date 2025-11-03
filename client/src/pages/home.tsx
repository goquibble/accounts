import useToken from "@/hooks/use-token";

export default function Home() {
  const token = useToken();

  return <span>{token}</span>;
}

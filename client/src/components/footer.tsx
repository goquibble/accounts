export default function Footer() {
  return (
    <footer className="flex items-center gap-2">
      <a
        href="https://legal.goquibble.online/terms-of-use"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground underline"
      >
        Terms of Use
      </a>
      <span className="text-muted-foreground text-sm">—</span>
      <a
        href="https://legal.goquibble.online/privacy-policy"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground underline"
      >
        Privacy Policy
      </a>
    </footer>
  );
}

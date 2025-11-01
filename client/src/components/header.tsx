export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 p-3">
      <a
        href="https://github.com/goquibble"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 w-max"
      >
        <img src="/favicon.svg" alt="Quibble" className="size-6" />
        <span className="font-medium">GoQuibble Platform</span>
      </a>
    </header>
  );
}

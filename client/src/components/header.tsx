export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 p-3 flex items-center justify-between">
      <a
        href="https://github.com/goquibble"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2"
      >
        <img src="/favicon.svg" alt="Quibble" className="size-6" />
        <span className="font-medium">Platform</span>
      </a>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/orgs/goquibble/discussions/new?category=q-a"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          Need help?
        </a>
      </div>
    </header>
  );
}

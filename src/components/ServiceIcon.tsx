export function ServiceIcon({ name }: { name: "web" | "mobile" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "web" ? (
        <>
          <rect x="4" y="9" width="40" height="30" rx="4" />
          <path d="M4 18h40" />
          <circle cx="10" cy="13.5" r="1" className="fill-oxide stroke-oxide" />
          <path d="M12 26h14M12 32h9" />
        </>
      ) : (
        <>
          <rect x="14" y="4" width="20" height="40" rx="5" />
          <path d="M21 9h6" />
          <circle cx="24" cy="38" r="1.2" className="fill-oxide stroke-oxide" />
        </>
      )}
    </svg>
  );
}

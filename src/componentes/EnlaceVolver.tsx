import type { ReactNode } from "react";
import { Link } from "react-router";

export function EnlaceVolver({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="mb-4 inline-block text-sm font-medium text-marca-700 underline dark:text-marca-500"
    >
      ← {children}
    </Link>
  );
}

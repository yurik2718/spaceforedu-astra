import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a raw phone string like "34663689393" → "+34 663 689 393" */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const match = digits.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
  if (match) return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  return `+${digits}`;
}

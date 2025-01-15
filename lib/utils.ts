import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}


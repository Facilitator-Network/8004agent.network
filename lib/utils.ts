import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function navigateTo(path: string) {
  if (window.location.pathname === path) return
  window.history.pushState({}, "", path)
  window.dispatchEvent(new Event("pushState"))
}

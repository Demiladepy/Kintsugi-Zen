export function truncateAddress(value: string, start = 4, end = 4) {
  if (!value) return "";
  if (value.length <= start + end) return value;
  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export function toDisplayError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unexpected error occurred.";
}

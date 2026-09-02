// Local runtime error reporting. No external/vendor telemetry hooks.

export function reportRuntimeError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error("[runtime-error]", message, { route: window.location.pathname, ...context }, stack);
}

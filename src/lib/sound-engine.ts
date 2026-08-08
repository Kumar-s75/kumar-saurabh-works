export function playSound(dataUri: string, options: { volume?: number } = {}) {
  if (typeof window === "undefined" || !dataUri) return;

  const audio = new Audio(dataUri);
  audio.volume = Math.max(0, Math.min(1, options.volume ?? 1));
  void audio.play().catch(() => undefined);
}

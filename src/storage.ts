export type Theme = 'system' | 'light' | 'dark';

export type Settings = {
  hideShorts: boolean;
  hidePlayables: boolean;
  theme: Theme;
};

export const DEFAULT_SETTINGS: Settings = {
  hideShorts: true,
  hidePlayables: true,
  theme: 'system',
};

export async function getSettings(): Promise<Settings> {
  const stored = await chrome.storage.local.get(['hideShorts', 'hidePlayables', 'theme']);

  const theme =
    stored.theme === 'light' || stored.theme === 'dark' || stored.theme === 'system'
      ? stored.theme
      : DEFAULT_SETTINGS.theme;

  return {
    hideShorts:
      typeof stored.hideShorts === 'boolean' ? stored.hideShorts : DEFAULT_SETTINGS.hideShorts,
    hidePlayables:
      typeof stored.hidePlayables === 'boolean'
        ? stored.hidePlayables
        : DEFAULT_SETTINGS.hidePlayables,
    theme,
  };
}

export async function setSetting<K extends keyof Settings>(
  key: K,
  value: Settings[K],
): Promise<void> {
  await chrome.storage.local.set({
    [key]: value,
  });
}

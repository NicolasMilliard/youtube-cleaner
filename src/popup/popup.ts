import { getSettings, setSetting, type Theme } from '../storage';

const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');

function applyTheme(theme: Theme): void {
  if (theme === 'system') {
    delete document.documentElement.dataset.theme;
    return;
  }

  document.documentElement.dataset.theme = theme;
}

function setThemeControl(theme: Theme): void {
  for (const input of themeInputs) {
    input.checked = input.value === theme;
  }
}

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}

const shortsToggle = getRequiredElement<HTMLInputElement>('#hide-shorts');

const allowShortsOnChannelsToggle = getRequiredElement<HTMLInputElement>(
  '#allow-shorts-on-channels',
);

const playablesToggle = getRequiredElement<HTMLInputElement>('#hide-playables');

async function init(): Promise<void> {
  const settings = await getSettings();

  shortsToggle.checked = settings.hideShorts;
  playablesToggle.checked = settings.hidePlayables;
  allowShortsOnChannelsToggle.checked = settings.allowShortsOnChannels;
  allowShortsOnChannelsToggle.disabled = !settings.hideShorts;

  setThemeControl(settings.theme);
  applyTheme(settings.theme);

  for (const input of themeInputs) {
    input.addEventListener('change', async () => {
      if (!input.checked) {
        return;
      }

      const theme = input.value as Theme;

      applyTheme(theme);
      await setSetting('theme', theme);
    });
  }
}

shortsToggle.addEventListener('change', async () => {
  await setSetting('hideShorts', shortsToggle.checked);

  allowShortsOnChannelsToggle.disabled = !shortsToggle.checked;
});

allowShortsOnChannelsToggle.addEventListener('change', async () => {
  await setSetting('allowShortsOnChannels', allowShortsOnChannelsToggle.checked);
});

playablesToggle.addEventListener('change', async () => {
  await setSetting('hidePlayables', playablesToggle.checked);
});

void init();

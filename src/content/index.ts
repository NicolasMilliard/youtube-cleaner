import { getSettings } from '../storage';

const ATTRIBUTES = {
  hideShorts: 'data-youtube-essentials-hide-shorts',
  allowShortsOnChannels: 'data-youtube-essentials-allow-shorts-on-channels',
  hidePlayables: 'data-youtube-essentials-hide-playables',
} as const;

function applySetting(attribute: string, enabled: boolean): void {
  document.documentElement.toggleAttribute(attribute, enabled);
}

async function init(): Promise<void> {
  const settings = await getSettings();

  applySetting(ATTRIBUTES.hideShorts, settings.hideShorts);
  applySetting(ATTRIBUTES.allowShortsOnChannels, settings.allowShortsOnChannels);

  applySetting(ATTRIBUTES.hidePlayables, settings.hidePlayables);
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') {
    return;
  }

  const hideShorts = changes.hideShorts?.newValue;

  if (typeof hideShorts === 'boolean') {
    applySetting(ATTRIBUTES.hideShorts, hideShorts);
  }

  const allowShortsOnChannels = changes.allowShortsOnChannels?.newValue;

  if (typeof allowShortsOnChannels === 'boolean') {
    applySetting(ATTRIBUTES.allowShortsOnChannels, allowShortsOnChannels);
  }

  const hidePlayables = changes.hidePlayables?.newValue;

  if (typeof hidePlayables === 'boolean') {
    applySetting(ATTRIBUTES.hidePlayables, hidePlayables);
  }
});

void init();

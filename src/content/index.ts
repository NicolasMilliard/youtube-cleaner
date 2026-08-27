import { getSettings } from '../storage';

const HIDE_SHORTS_ATTRIBUTE = 'data-youtube-cleaner-hide-shorts';

function applyHideShorts(enabled: boolean): void {
  if (enabled) {
    document.documentElement.setAttribute(HIDE_SHORTS_ATTRIBUTE, '');
    return;
  }

  document.documentElement.removeAttribute(HIDE_SHORTS_ATTRIBUTE);
}

async function init(): Promise<void> {
  const settings = await getSettings();

  applyHideShorts(settings.hideShorts);
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') {
    return;
  }

  const hideShortsChange = changes.hideShorts;

  if (typeof hideShortsChange?.newValue !== 'boolean') {
    return;
  }

  applyHideShorts(hideShortsChange.newValue);
});

void init();

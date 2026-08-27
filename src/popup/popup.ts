import { getSettings, setSetting } from '../storage';

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}

const shortsToggle = getRequiredElement<HTMLInputElement>('#hide-shorts');

const playablesToggle = getRequiredElement<HTMLInputElement>('#hide-playables');

async function init(): Promise<void> {
  const settings = await getSettings();

  shortsToggle.checked = settings.hideShorts;
  playablesToggle.checked = settings.hidePlayables;
}

shortsToggle.addEventListener('change', async () => {
  await setSetting('hideShorts', shortsToggle.checked);
});

playablesToggle.addEventListener('change', async () => {
  await setSetting('hidePlayables', playablesToggle.checked);
});

void init();

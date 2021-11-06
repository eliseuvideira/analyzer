import { wappalyzer } from "../utils/wappalyzer";

export const analyze = async (url: string) => {
  await wappalyzer.init();

  try {
    const site = await wappalyzer.open(url);

    const results = await site.analyze();

    return results;
  } finally {
    await wappalyzer.destroy();
  }
};

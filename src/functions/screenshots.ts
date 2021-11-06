import path from "path";
import puppeteer from "puppeteer";

const makeUrl = (id: string) => `${process.env.API_URL}/images/${id}`;

export const screenshots = async (url: string, id: string) => {
  const browser = await puppeteer.launch({
    headless: !!+process.env.HEADLESS,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-features=UserAgentClientHint",
    ],
  });

  const images = {
    desktop: {
      visible: path.join(__dirname, "..", "..", "storage", id + ".png"),
      fullpage: path.join(
        __dirname,
        "..",
        "..",
        "storage",
        id + "_fullscreen" + ".png",
      ),
    },
    mobile: {
      visible: path.join(
        __dirname,
        "..",
        "..",
        "storage",
        id + ".mobile" + ".png",
      ),
      fullpage: path.join(
        __dirname,
        "..",
        "..",
        "storage",
        id + "_fullscreen" + ".mobile" + ".png",
      ),
    },
  };

  try {
    const pages = await browser.pages();

    const page = pages[0];

    await page.setViewport({ height: 932, width: 1920 });

    await page.goto(url);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.screenshot({
      path: images.desktop.visible,
    });
    await page.screenshot({
      path: images.desktop.fullpage,
      fullPage: true,
    });

    await page.setViewport({ height: 845, width: 425 });

    await page.screenshot({
      path: images.mobile.visible,
    });
    await page.screenshot({
      path: images.mobile.fullpage,
      fullPage: true,
    });

    return [
      makeUrl(`${id}.png`),
      makeUrl(`${id}_fullscreen.png`),
      makeUrl(`${id}.mobile.png`),
      makeUrl(`${id}_fullscreen.mobile.png`),
    ];
  } finally {
    await browser.close();
  }
};

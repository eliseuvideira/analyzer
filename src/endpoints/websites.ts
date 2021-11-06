import { endpoint } from "@ev-fns/endpoint";
import { analyze } from "../functions/analyze";
import { nanoid } from "../functions/nanoid";
import { screenshots } from "../functions/screenshots";

const parseImages = (images: string[]) => {
  return `Desktop:\n${images.slice(0, 2).join("\n")}\n\nMobile:\n${images
    .slice(2, 4)
    .join("\n")}`;
};

const parse = ({ url, technologies, images }: any) => {
  const paas = technologies.filter(
    (technology: any) => technology.category === "PaaS",
  );
  const frameworks = technologies.filter(
    (technology: any) =>
      technology.category === "JavaScript frameworks" ||
      technology.category === "Web frameworks",
  );
  const analytics = technologies.filter(
    (technology: any) => technology.category === "Analytics",
  );
  const cdns = technologies.filter(
    (technology: any) => technology.category === "CDN",
  );
  const securities = technologies.filter(
    (technology: any) => technology.category === "Security",
  );

  return `${url}\n${
    frameworks.length
      ? "\n" +
        "Frameworks:\n" +
        frameworks.map((tech: any) => tech.name).join("\n") +
        "\n"
      : ""
  }${
    analytics.length
      ? "\n" +
        "Analytics:\n" +
        analytics.map((tech: any) => tech.name).join("\n") +
        "\n"
      : ""
  }${
    cdns.length
      ? "\n" + "CDN:\n" + cdns.map((tech: any) => tech.name).join("\n") + "\n"
      : ""
  }${
    securities.length
      ? "\n" +
        "Security:\n" +
        securities.map((tech: any) => tech.name).join("\n") +
        "\n"
      : ""
  }${
    paas.length
      ? "\n" + "PaaS:\n" + paas.map((tech: any) => tech.name).join("\n") + "\n"
      : ""
  }\nScreenshots:\n\n${parseImages(images)}\n`;
};

export const websitesPostOne = endpoint(async (req, res) => {
  const { url } = req.body;

  const { output } = req.query;

  const id = nanoid();

  const results = await analyze(url);

  const _technologies = results.technologies || [];

  const technologies = _technologies
    .filter((technology: any) =>
      technology.categories.some((category: any) =>
        [
          "PaaS",
          "JavaScript frameworks",
          "Web frameworks",
          "Analytics",
          "CDN",
          "Security",
        ].includes(category.name),
      ),
    )
    .map((technology: any) => {
      const category = technology.categories.find((category: any) =>
        [
          "PaaS",
          "JavaScript frameworks",
          "Analytics",
          "CDN",
          "Security",
        ].includes(category.name),
      );

      return { name: technology.name, category: category.name };
    });

  const images = await screenshots(url, id);

  if (output === "json") {
    res.status(200).json({ url, technologies, images });
  } else {
    res.status(200).send(parse({ url, technologies, images }));
  }
});

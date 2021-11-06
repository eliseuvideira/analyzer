import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import fs from "fs";
import path from "path";

const fileExists = async (filename: string) => {
  try {
    const stat = await fs.promises.stat(filename);

    return stat.isFile();
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
};

export const imagesGetOne = endpoint(async (req, res) => {
  const { id } = req.params;
  const { inline } = req.query;

  const filename = path.join(__dirname, "..", "..", "storage", id);

  const exists = await fileExists(filename);
  if (!exists) {
    throw new HttpError(404, "Not found");
  }

  const stream = fs.createReadStream(filename);

  stream.pipe(
    res
      .header(
        "Content-Disposition",
        `${inline ? "inline" : "attachment"}; filename="${id}"`,
      )
      .header("Cache-Control", "public, max-age=31557600, immutable")
      .contentType("image/png")
      .status(200),
  );
});

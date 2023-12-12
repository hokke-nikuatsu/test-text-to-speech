import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;

const client = new textToSpeech.TextToSpeechClient({ opts: apiKey });

async function quickStart() {
  const text =
    "The article suggested that Sam Altman might increase his influence following the turmoil caused by his resignation from the OpenAI board.";

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

  const [response] = await client.synthesizeSpeech(request);
  if (!response.audioContent) {
    console.log("error!");
    return;
  }

  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");
}

quickStart();

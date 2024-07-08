export function request(ctx) {
  const ingredients = ctx.args;

  const prompt = `Generate an image using the following input: ${ingredients})}.`;
  const b64encodedImage = ctx.args.image.toString("base64");

  return {
    resourcePath: `/model/amazon.titan-image-generator-v1/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        taskType: "INPAINTING",
        inPaintingParams: {
          image: `${b64encodedImage}`,
          maskPrompt: `\n\nHuman:${prompt}\n\nAssistant:`,
        },
        imageGenerationConfig: {
          numberOfImages: 1,
          height: 768,
          width: 768,
          cfgScale: 8.0,
        },
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}

// {
//   "taskType": "INPAINTING",
//   "inPaintingParams": {
//   "image": `${b64encodedImage}`,
//   "text": `\n\nHuman:${prompt}\n\nAssistant:`,
//   "negativeText": "string",
//   "maskPrompt": `\n\nHuman:${prompt}\n\nAssistant:`
// },
// "imageGenerationConfig": {
//   "numberOfImages": 1,
//   "height": 768,
//   "width": 768,
//   "cfgScale": 8.0
// }
// }

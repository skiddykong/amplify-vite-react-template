export function request(ctx) {
  const instructions = ctx.args.aiPrompt;

  const prompt = `Generate an image using the following input: ${instructions}.`;
  const b64encodedImage = ctx.args.image;

  return {
    resourcePath: `/model/amazon.titan-image-generator-v1/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        "taskType": "INPAINTING",
        "inPaintingParams": {
          "image": `${b64encodedImage}`,
          "maskPrompt": "table in the center",
          "text": `\n\nHuman:${prompt}\n\nAssistant:`
        },
        "imageGenerationConfig": {
          "numberOfImages": 1,
          "height": 768,
          "width": 768,
          "cfgScale": 8.0
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



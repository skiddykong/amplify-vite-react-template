export function request(ctx) {
    console.log("bedrock_amend_image.js: ctx into amend_image resolver function: {}", ctx);
    const instructions = ctx.args.aiPrompt;
  
    const prompt = `Amend an image using the following input: ${instructions}.`;
    const b64encodedImage = ctx.args.image;
    const negativeText = ctx.args.negativeText;
    const similarityStrength = ctx.args.similarityStrength;
  
    return {
      resourcePath: `/model/amazon.titan-image-generator-v1/invoke`,
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          taskType: "IMAGE_VARIATION",
          inPaintingParams: {
            images: [`${b64encodedImage}`],
            negativeText: `${negativeText}`,
            text: `\n\nHuman:${prompt}\n\nAssistant:`,
            similarityStrength: similarityStrength,
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
  
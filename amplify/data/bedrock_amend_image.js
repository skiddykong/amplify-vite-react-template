export function request(ctx) {
  console.log("ctx into amend_existing_image resolver function");
  const instructions = ctx.args.aiPrompt;

  const prompt = `Amend an image using the following input: ${instructions}.`;
  const b64encodedImage = ctx.prev.result.image;
  console.log("Amend Image Func Sending to Bedrock", prompt, b64encodedImage.substring(0,20));

  let amendImageRequest = {
    resourcePath: `/model/amazon.titan-image-generator-v1/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        taskType: "IMAGE_VARIATION",
        imageVariationParams: {
          images: [`${b64encodedImage}`],
          text: `\n\nHuman:${prompt}\n\nAssistant:`
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
  console.log("Amend Image Func Sending to Bedrock", amendImageRequest.params.body.imageVariationParams.text);
  return amendImageRequest;
}

export function response(ctx) {
  console.log("amend an image resolver: response received from bedrock");
  return {
    body: ctx.result.body,
  };
}

import { util } from '@aws-appsync/utils'


export function request(ctx) {
  // console.log("bedrock_amend_image.js: ctx into amend_image resolver function: {}", JSON.stringify(ctx.prev.result, null, 2));
  const instructions = ctx.args.aiPrompt;

  const prompt = `Amend an image using the following input: ${instructions}.`;
  const b64encodedImage = util.base64Encode(ctx.prev.result.body);
  console.log("Amend Image Func Sending to Bedrock", prompt, " ", b64encodedImage.substring(0,20));

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
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}

export function request(ctx) {
  const ingredients = ctx.args;
  console.log("request function in bedrock.js");
  const prompt = `Generate an image using the following input: ${ingredients})}.`;

  return {
    resourcePath: `/model/amazon.titan-image-generator-v1/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": `\n\nHuman:${prompt}\n\nAssistant:`
        }
    },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
// \n\nHuman:${prompt}\n\nAssistant:
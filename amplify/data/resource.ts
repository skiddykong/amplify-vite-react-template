import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  ImageRequest: a.customType({
    image: a.string(),
    mask: a.string(),
    aiPrompt: a.string(),
  }),

  CustomerExchequer: a.model({
    email: a.string(),
    subscribed: a.boolean(),
    imagesGenerated: a.integer(),
    imagesRemaining: a.integer()
  }).authorization(allow => allow.publicApiKey()), // TODO: Only backend should be able to call this

  askBedrock: a
    .query()
    .arguments({ aiPrompt: a.string() })
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler(
      a.handler.custom({ entry: "./bedrock_text_to_image.js", dataSource: "bedrockDS" })
    ),
  amendAnImageWithInpainting: a
    .query()
    .arguments({ aiPrompt: a.string(), maskPrompt: a.string(), image: a.string()})
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler(
      a.handler.custom({ entry: "./bedrock_inpainting_image.js", dataSource: "bedrockDS" })
    ),
  amendAnImage: a
    .mutation()
    .arguments({ aiPrompt: a.string(), image: a.string()})
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler([
      a.handler.custom({ entry: "./fetch_from_s3_lambda_resolver.js", dataSource: "s3LambdaDS" }),
      a.handler.custom({ entry: "./bedrock_amend_image.js", dataSource: "bedrockDS" }),
      a.handler.custom({ entry: "./store_to_s3_lambda_resolver.js", dataSource: "s3LambdaDS" }),
      ]
    ),
  amendAnImageV2: a
    .mutation()
    .arguments({ aiPrompt: a.string(), image: a.string()})
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler([
      a.handler.custom({ entry: "./amend_image_v2_java_lambda_resolver.js", dataSource: "imageGenerationDS" }),
      ]
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

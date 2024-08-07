import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askBedrock: a
    .query()
    .arguments({ aiPrompt: a.string() })
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler(
      a.handler.custom({ entry: "./bedrock_text_to_image.js", dataSource: "bedrockDS" })
    ),
  amendAnImage: a
    .query()
    .arguments({ aiPrompt: a.string(), maskPrompt: a.string(), image: a.string()})
    .returns(a.ref("BedrockResponse"))
    .authorization(allow => allow.publicApiKey())
    .handler(
      a.handler.custom({ entry: "./bedrock_amend_image.js", dataSource: "bedrockDS" })
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

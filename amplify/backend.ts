import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { storage } from "./storage/resource";

export const backend = defineBackend({
  auth,
  data,
  storage,
});

const s3LambdaDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "s3LambdaDS",
  "https://s3.us-east-1.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "us-east-1",
      signingServiceName: "s3",
    },
  }
);

s3LambdaDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "s3:GetObject",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:CreateLogGroup",
      "s3-object-lambda:WriteGetObjectResponse",
    ],
    resources: [backend.storage.resources.bucket.bucketArn + "/*"],
  })
);


const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.us-east-1.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "us-east-1",
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-image-generator-v1",
    ],
    actions: ["bedrock:InvokeModel"],
  })
);

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
	S3_BUCKET_NAME: backend.storage.resources.bucket.bucketName,
}
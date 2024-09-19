import {defineBackend} from "@aws-amplify/backend";
import {auth} from "./auth/resource";
import {data} from "./data/resource";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {storage} from "./storage/resource";
import {aws_lambda as lambda} from "aws-cdk-lib";

export const backend = defineBackend({
  auth,
  data,
  storage
});

const s3StorageFunction =  lambda.Function.fromFunctionAttributes(backend.data.resources.graphqlApi,
  "s3StorageFunction",
  {
    functionArn: "arn:aws:lambda:us-east-1:975049897914:function:getImageFromStorage",
    skipPermissions: true
  }
);

const imageGenerationServiceFunction =  lambda.Function.fromFunctionAttributes(backend.data.resources.graphqlApi,
  "imageGenerationServiceFunction",
  {
    functionArn: "arn:aws:lambda:us-east-1:975049897914:function:imageGeneratorServiceV_0_1_0",
    skipPermissions: true
  }
);

const imageGenerationServiceFunctionDS = backend.data.resources.graphqlApi.addLambdaDataSource(
  "imageGenerationDS",
  imageGenerationServiceFunction,
  {}
);

imageGenerationServiceFunctionDS.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "lambda:InvokeFunction"
    ],
    resources: [imageGenerationServiceFunction.functionArn + "/*"],
  })
);

const s3LambdaDataSource = backend.data.resources.graphqlApi.addLambdaDataSource(
  "s3LambdaDS",
  s3StorageFunction,
  {}
);

s3LambdaDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "lambda:InvokeFunction"
    ],
    resources: [s3StorageFunction.functionArn + "/*"],
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



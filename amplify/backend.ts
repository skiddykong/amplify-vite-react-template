import {defineBackend} from "@aws-amplify/backend";
import {auth} from "./auth/resource";
import {data} from "./data/resource";
import {Policy, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {storage} from "./storage/resource";
import {aws_lambda as lambda, Stack} from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  EndpointType,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";

export const backend = defineBackend({
  auth,
  data,
  storage
});

// Amend Image Function Start --------------------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createRestfulAPI() {



  const imagesApiFunction =  lambda.Function.fromFunctionAttributes(backend.data.resources.graphqlApi,
    "imagesApiFunction",
    {
      functionArn: "arn:aws:lambda:us-east-1:975049897914:function:imageGeneratorServiceV_0_1_0",
      skipPermissions: false,
      sameEnvironment: true,
    }
  );

  const apiStack = backend.createStack("amend-image-api-stack");

  const imageGenerationRestApi = new RestApi(apiStack, "imageGenerationRestApi", {
    restApiName: "ImageGenerationAPI_00",
    description: "This API generates images using AI",
    deploy: true,
    endpointConfiguration: {
      types: [EndpointType.REGIONAL]
    },
    deployOptions: {
      stageName: "prod",
    },
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: Cors.DEFAULT_HEADERS
    },
  });

  const amendImageIntegration = new LambdaIntegration(imagesApiFunction);


  const imagesPath = imageGenerationRestApi.root.addResource("images", {
    defaultMethodOptions: {
      authorizationType: AuthorizationType.IAM,
    }
  });

  imagesPath.addMethod("POST", amendImageIntegration);

  imagesPath.addProxy({
    anyMethod: true,
    defaultIntegration: amendImageIntegration
  })

  const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuthorizer", {
    cognitoUserPools: [backend.auth.resources.userPool]
  });

  const aPath = imageGenerationRestApi.root.addResource("cognito-auth-path");
  aPath.addMethod("POST", amendImageIntegration, {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: cognitoAuthorizer,

  });

  const apiRestPolicy = new Policy(apiStack, "apiRestPolicy", {
    statements: [
      new PolicyStatement({
        actions: ["execute-api:Invoke"],
        resources: [
          `${imageGenerationRestApi.arnForExecuteApi("POST", "/images", "prod")}`,
          `${imageGenerationRestApi.arnForExecuteApi("POST", "/images/*", "prod")}`,
          `${imageGenerationRestApi.arnForExecuteApi("*", "/cognito-auth-path", "prod")}`,
        ],
      }),
    ],
  })


  backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);
  backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);

  backend.addOutput({
    custom: {
      API: {
        [imageGenerationRestApi.restApiName]: {
          endpoint: imageGenerationRestApi.url,
          region: Stack.of(imageGenerationRestApi).region,
          apiName: imageGenerationRestApi.restApiName,
        }
      }
    }
  })
}

createRestfulAPI();

// Amend Image Function End --------------------------------

const s3StorageFunction =  lambda.Function.fromFunctionAttributes(backend.data.resources.graphqlApi,
  "s3StorageFunction",
  {
    functionArn: "arn:aws:lambda:us-east-1:975049897914:function:getImageFromStorage",
    skipPermissions: true
  }
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



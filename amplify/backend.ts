import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import {
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam'
import { storage } from "./storage/resource";
import { getImageFromStorage } from "./getImageFromStorage/resource";
import { Stack } from 'aws-cdk-lib'

const backend = defineBackend({
  auth,
  data,
  storage,
  getImageFromStorage,
});

backend.getImageFromStorage.resources.lambda.addToRolePolicy(
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

const s3LambdaDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "s3LambdaDS",
  "https://amplify-d3jpe9fuuwevuf-ma-amplifyteamdrivebucket28-fvkzlkzn4cf1.s3.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "us-east-1",
      signingServiceName: "bedrock",
    },
  }
);

const lambdaS3ResolverRole = new Role(
	Stack.of(backend.data),
	'createS3RetreiverRole',
	{
		assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
		inlinePolicies: {
			invokeFunction: new PolicyDocument({
				statements: [
					new PolicyStatement({
						actions: ['lambda:InvokeFunction'],
						resources: [backend.getImageFromStorage.resources.lambda.functionArn],
					}),
				],
			}),
		},
	}
)

s3LambdaDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
		actions: ['iam:PassRole'],
		resources: [lambdaS3ResolverRole.roleArn],
	})
)

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

import type { APIGatewayProxyHandler } from "aws-lambda";
import { LambdaClient, InvokeCommand , LogType, InvocationType } from "@aws-sdk/client-lambda";
export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("event", event);

  const client = new LambdaClient({});
  const payload = {
    "bucketName": "amplify-amplifyvitereactt-amplifyteamdrivebucket28-wzwniboilj0f",
    "objectKey": "users/us-east-1:e30580b7-ba77-ce21-ef2b-ce09a8b9600f/uploads/base_image/poker_table.png",
    "operation": "TEST_RESPONSE",
    "aiPrompt": "Change color of poker table to green"
  }

  const functionName = "imageGeneratorServiceV_0_1_0";
  const input = { // InvocationRequest
    FunctionName: functionName, // required
    InvocationType: InvocationType.RequestResponse,
    LogType: LogType.Tail,
    Payload: JSON.stringify(payload) // e.g. Buffer.from("") or new TextEncoder().encode("")
  };
  const command = new InvokeCommand(input);

  const response = await client.send(command);

  const jsonString = Buffer.from(response.Payload).toString('utf8')
  const responsePayload = JSON.parse(jsonString)
  console.log(responsePayload)


  console.log("response", response);
  return {
    statusCode: 200,
    // Modify the CORS settings below to match your specific requirements
    headers: {
      "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
      "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
    },
    body: JSON.stringify(responsePayload),
  };
};


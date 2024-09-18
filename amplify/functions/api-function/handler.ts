import type { APIGatewayProxyHandler } from "aws-lambda";
import { LambdaClient, InvokeCommand , LogType, InvocationType } from "@aws-sdk/client-lambda";



export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("event", event);

  const client = new LambdaClient({});

  const functionName = "imageGeneratorServiceV_0_1_0";
  const input = { // InvocationRequest
    FunctionName: functionName, // required
    InvocationType: InvocationType.Event,
    LogType: LogType.Tail,
    Payload: event.body // e.g. Buffer.from("") or new TextEncoder().encode("")
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


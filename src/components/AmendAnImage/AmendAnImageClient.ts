import {post} from 'aws-amplify/api';
import getErrorMessage from "../../utils/ErrorUtils.ts";

async function postItem() {
  console.log('POST call initiated');
  try {
    console.log('POST call in progress');
    const restOperation = post({
      apiName: 'ImageGenerationAPI_00',
      path: 'images/',
      options: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: {
          "bucketName": "amplify-amplifyvitereactt-amplifyteamdrivebucket28-wzwniboilj0f",
          "objectKey": "users/us-east-1:e30580b7-ba77-ce21-ef2b-ce09a8b9600f/uploads/base_image/poker_table.png",
          "operation": "TEST_RESPONSE",
          "aiPrompt": "Change color of poker table to green"
        }
      }
    });

    const {body} = await restOperation.response;
    const response = await body.json();

    console.log('POST call succeeded');
    console.log(response);
  } catch (error) {
    console.error('POST call failed');
    console.log(getErrorMessage(error));
  }
}

export default postItem;

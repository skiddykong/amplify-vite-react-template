import { post } from 'aws-amplify/api';
import getErrorMessage from "../../utils/ErrorUtils.ts";

async function postItem() {
  console.log('POST call initiated');
  try {
    console.log('POST call in progress');
    const restOperation = post({
      apiName: 'ImageGenerationAPI',
      path: 'images',
      options: {
        body: {
          message: 'Mow the lawn'
        }
      }
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('POST call succeeded');
    console.log(response);
  } catch (error) {
    console.error('POST call failed');
    console.log(getErrorMessage(error));
  }
}

export default postItem;

import {post} from 'aws-amplify/api';
import getErrorMessage from "../../utils/ErrorUtils.ts";

interface PostItemProps {
  bucketName: string;
  objectKey: string;
  operation: string;
  aiPrompt: string;
}


async function postItem(props: PostItemProps) {
  console.log('POST call initiated');
  try {
    console.log('POST call in progress');
    const restOperation = post({
      apiName: 'ImageGenerationAPI_02',
      path: 'images/',
      options: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: {
          bucketName: props.bucketName,
          objectKey: props.objectKey,
          operation: props.operation,
          aiPrompt: props.aiPrompt
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

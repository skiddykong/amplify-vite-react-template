import {util} from '@aws-appsync/utils';

/**
 * Sends a request to a Lambda function. Passes all information about the request from the `info` object.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').LambdaRequest} the request
 */
export function request(ctx) {
  console.log("ctx into amend_existing_image resolver function: {}", ctx);
  ctx.stash.objectKey = ctx.args.image;
  return {
    operation: 'Invoke',
    payload: {
      bucketName: `${ctx.env.S3_BUCKET_NAME}`,
      objectKey: `${ctx.args.image}`,
      operation: 'GET',
    },
  };
}


/**
 * Process a Lambda function response
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the Lambda function response
 */
export function response(ctx) {
  const {result, error} = ctx;
  if (result) {
    console.log("image returned from lambda");
  } else {
    console.log("image not returned from lambda");
  }

  if (error) {
    util.error(error.message, error.type, result);
  }
  return result;
}

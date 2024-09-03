import {util} from '@aws-appsync/utils';

/**
 * Sends a request to a Lambda function. Passes all information about the request from the `info` object.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').LambdaRequest} the request
 */
export function request(ctx) {
  console.log("store_to_s3_lambda_resolver.js ctx into resolver function: {}", ctx);

  return {
    operation: 'Invoke',
    payload: {
      bucketName: `${ctx.env.S3_BUCKET_NAME}`,
      objectKey: `${ctx.stash.objectKey}`,
      object: `${ctx.prev.result.image}`,
      operation: 'PUT',
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
    console.log("store_to_s3_lambda_resolver.js image returned from lambda");
  } else {
    console.log("store_to_s3_lambda_resolver.js image not returned from lambda");
  }

  if (error) {
    util.error(error.message, error.type, result);
  }
  return result;
}

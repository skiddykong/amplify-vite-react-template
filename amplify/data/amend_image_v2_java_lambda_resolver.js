
/**
 * Sends a request to a Lambda function. Passes all information about the request from the `info` object.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').LambdaRequest} the request
 */
export function request(ctx) {
  console.log("ctx into amend_existing_java_image resolver function: {}", ctx);
  ctx.stash.objectKey = ctx.args.image;
  return {
    operation: 'Invoke',
    invocationType: 'Event',
    payload: {
      bucketName: `${ctx.env.S3_BUCKET_NAME}`,
      objectKey: `${ctx.args.image}`,
      operation: 'AMEND_IMAGE',
      aiPrompt: `${ctx.args.aiPrompt}`,
    },
  };
}


/**
 * Process a Lambda function response (async 202)
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the Lambda function response
 */
export function response(ctx) {
  let response = `${ctx.stash.objectKey} Accepted`;
  return {
    body: response,
  };
}

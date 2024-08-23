import { util } from "@aws-appsync/utils";


/**
 * Invoke the S3 storage get object function
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').LambdaRequest} the request
 */
export function request(ctx) {
  console.log(
    "fetch_from_s3_lamda_resolver.js: ctx into amend_existing_image resolver function: {}",
    ctx
  );

  return {
    method: 'GET',
    params: {
      headers: {
        'Content-Type': 'image/jpeg',
  


      }
    },
    resourcePath: `/${ctx.env.S3_BUCKET_NAME}/unstaged/${ctx.args.image}`,
  };
}

/**
 * Process a Lambda function response
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the Lambda function response
 */
export function response(ctx) {
  const { result, error } = ctx;
  if (result) {
    console.log("result: " + result);
  } else {
    console.log("result was undefined");
  }

  if (error) {
    util.error(error.message, error.type, result);
  }
  return util.base64Encode(result);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

console.log('Loading function');
const s3 = new S3Client();

export const handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.s3.bucket.name;
    const key = decodeURIComponent(event.s3.object.key.replace(/\+/g, ' '));
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    try {
        const response = await s3.send(command);
        const imageAsString = await response.Body.transformToString();
        console.log("returning imageAsString: " + imageAsString.substring(1, 10))
        return {
            "image": imageAsString.substring(1, 10)
        }
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};

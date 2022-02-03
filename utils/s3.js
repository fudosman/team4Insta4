const aws = require('aws-sdk')
require('dotenv').config();

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION
})

const s3Instance = new aws.S3(), bucket = process.env.S3_BUCKET;
module.exports = { aws, s3Instance, bucket };
import AWS from 'aws-sdk';
//specifying aws region where dynamodb table will be created
AWS.config.update({ 
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: ''
 });
//instantiate dynamodb class
const dynamodb = new AWS.DynamoDB();


export default dynamodb
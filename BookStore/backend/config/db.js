import AWS from 'aws-sdk';
//specifying aws region where dynamodb table will be created
AWS.config.update({ 
  region: 'us-east-1',
  accessKeyId: 'ASIAU3PXJ3AWMKVOSZE3',
  secretAccessKey: 'TnrKdAi3hPD5Vx3YFJ7E6x8SR6amPYZMJZYU0fmE',
  sessionToken: 'FwoGZXIvYXdzEDUaDPdffhTBNu8hiwaMtiLIAYoR1h+pbobxwtC3c/HO+OepeY6N9t9QVIvRlcYpTQmxY/vNQCh7LvxiAkyC+CYT8wovnxEpZDxKjwtEHVZNNr4o8lu2YI94bolugb+yAI8gHfeqX72Qbu0f9VMOsK7AjM1LKFvuYFGffF2Ch7wWYlxYrY1632u8d856UHbDu7PATnqwpyNBLzu2imwNmDwIIyIvlAXM23SAMDk4q12NcAYZChCXJopaoqtkrs/76tbl3zawSu8cefW9Kc5a5GDENqQK6JOxFj+wKODhlKMGMi3yQZ6ph6pLOnqeCq3HH29sHJoRN1iUPPvawuZQdYxplBOseTUWWsfXu5xfKVc='
 });
//instantiate dynamodb class
const dynamodb = new AWS.DynamoDB();


export default dynamodb
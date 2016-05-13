# StarterKit - Brown Bear


#### This is an introductory skill for Amazon Alexa showing variables and session persistence.

See details on building voice applications for Amazon Alexa, at https://developer.amazon.com/ask

Based on the popular children's book [Brown Bear, Brown Bear, What Do You See?](https://amzn.com/0805047905),
this skill shows how to track multiple variables, save state to an array, and retrieve state.


You may launch this skill by saying "talk to brown bear", or you can jump right in with "tell brown bear I see a red bird".

Continue describing what you see:  "I see a purple cat", "I see a green frog", etc.

When you are done, just say "I see a teacher".  The skill will then recite the list of animals back to you.



#### SQS Messages
You can include code to write event state to the AWS SQS queue service.
On each dialog, the skill can send a new SQS message.
Be sure you are in the US-East N. Virginia region when working in the AWS Console.

Steps to configure:

1. Login to the [SQS Console](https://console.aws.amazon.com/sqs/home?region=us-east-1#)
2. Create a new Queue, called AlexaQueue.
3. Set the "Receive Message Wait Time" to 20 seconds.  This is needed to enable client long polling.
4. Click on the new queue, and note the full URL for the queue below, such as https://sqs.us-east-1.amazonaws.com/333304289633/AlexaQueue
5. Paste this queue URL into the index.js code, replacing the SQS queue URL parameter provided.
6. Adjust your AWS Lambda execution role to add SQS.
7. From the [IAM Console](https://console.aws.amazon.com/iam/home?region=us-east-1#roles), click on your default lambda_basic_execution role you created during skill setup.
8. Click "Attach Policy" and choose "AmazonSQSFullAccess".
9. Review the Lambda source code.  **Uncomment** out the lines near the end of the function to enable SQS.  The "context.succeed" line will now be nested in an SQS callback block.
10. Test your skill via the Developer Console or an Echo device.  You should see a new SQS message, with a custom URL in the body, for each interaction.

# StarterKit - Dashboard


#### This is a tutorial for Amazon Alexa showing how to automate publishing code to AWS Lambda, and how to include a data set file to be used by a skill.

See details on building voice applications for Amazon Alexa, at https://developer.amazon.com/ask

You may launch this skill by saying "open inventory dashboard", or you can jump right in with "ask inventory dashboard how many oranges?".

When you are done, just say "thank you".  The skill will then recite the list of items back to you.



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
6. Adjust your AWS Lambda execution role to add SQS permissions:
  * From the [IAM Console](https://console.aws.amazon.com/iam/home?region=us-east-1#roles), click on your default lambda_basic_execution role you created during skill setup.
  * Click "Attach Policy" and choose "AmazonSQSFullAccess".
7. Review the Lambda source code.  **Uncomment** out the function near the end called RespondSendSqsMessage to enable SQS.  Comment out the original Respond() function.
8. Test your skill via the Developer Console or an Echo device.  You should see a new SQS message, with a custom URL in the body, for each interaction.


#### IOT Thing Updates
1. Login to the [IOT Console](https://console.aws.amazon.com/iot/home?region=us-east-1)
2. Review [ASK/IOT blog post](https://developer.amazon.com/public/community/post/Tx3828JHC7O9GZ9/Using-Alexa-Skills-Kit-and-AWS-IoT-to-Voice-Control-Connected-Devices) to configure your IoT device
3. Review the Lambda source code.  **Uncomment** out the function near the end called RespondUpdateIotShadow to enable IoT updates.  Comment out the original Respond() function.
4. Test your skill via the Developer Console or an Echo device.  You should see a new IoT update, on your physical device or via the MQTT Client console.



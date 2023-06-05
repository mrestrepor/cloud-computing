from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

import openai
import logging
import boto3
import os

# Define the blueprint
blueprint_openai = Blueprint(name="blueprint_openai", import_name=__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

session = boto3.Session(
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    aws_session_token=os.environ.get("AWS_SESSION_TOKEN")
)

aws_region = os.environ.get("AWS_DEFAULT_REGION")

dynamodb = session.resource('dynamodb', region_name=aws_region)
table = dynamodb.Table('images')


@blueprint_openai.route('/process_message', methods=['POST'])
@cross_origin()
def completion_openai():
    try:
        # Retrieve body data from input JSON
        message = request.json.get('message')

        if message:
            logger.info(f"Received message: {message}")

            prompt = generate_clean_prompt(message)
            if prompt:
                images = generate_image(prompt)
                return jsonify({"message": message, "urls": images})
            else:
                return jsonify({'error': 'Invalid or empty message'})

        return jsonify({'error': 'Invalid or empty message'})

    except Exception as e:
        logger.exception("An error occurred during API processing.")
        return jsonify({'error': 'An error occurred during API processing.'}), 500


@blueprint_openai.route('/process_user', methods=['POST'])
@cross_origin()
def completion_logged():
    try:
        # Retrieve body data from input JSON
        message = request.json.get('message')

        if message:
            logger.info(f"Received message: {message}")

            prompt = generate_clean_prompt(message)
            if prompt:
                images = generate_image(prompt)

                email = "miguel@gmail.com"

                if (get_urls(email) is None):
                    create_url(email, images)
                else:
                    update_urls(email, images)

                return jsonify({"message": message, "urls": images})
            else:
                return jsonify({'error': 'Invalid or empty message'})

        return jsonify({'error': 'Invalid or empty message'})

    except Exception as e:
        logger.exception("An error occurred during API processing.")
        return jsonify({'error': 'An error occurred during API processing.'}), 500


def generate_clean_prompt(message):
    response = openai.Edit.create(
        model="text-davinci-edit-001",
        input=message,
        instruction="Fix the spelling mistakes",
        n=1,
        temperature=0.6
    )

    logger.info(f"OpenAI Edit API response: {response}")

    if response.choices:
        return response.choices[0].text.strip()

    return None


def generate_image(message):
    response = openai.Image.create(
        prompt=message,
        n=3,
        size="1024x1024"
    )

    logger.info(f"OpenAI Image API response: {response}")

    if response.data:
        return [image["url"] for image in response.data]

    return []


def create_url(email, urls):
    if (urls != ""):
        response = table.put_item(
            Item={
                'email': email,
                'urls': ', '.join(urls)
            })
        return response
    return ""


def get_urls(email):
    response = table.get_item(
        Key={
            'email': email
        }
    )
    item = response.get('Item')
    print(item)
    if item:
        return item
    else:
        return None


def update_urls(email, urls):
    response = table.get_item(Key={'email': email})
    existing_urls = response['Item']['urls'] if 'Item' in response else []
    response = table.update_item(
        Key={
            'email': email
        },
        UpdateExpression='SET urls = :val',
        ExpressionAttributeValues={
            ':val': existing_urls + ", " + (', '.join(urls))
        }
    )
    return response


def delete_urls(email):
    response = table.delete_item(
        Key={
            'email': email
        }
    )
    return response

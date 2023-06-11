web_hooks
=========

#### Webhooks done by payments

Here are the API endpoints related to webhooks:

-   Register

    -   Endpoint: `http://localhost:5000/api/register`
    -   Method: `POST`
    -   Description: Used for user registration.
-   Login

    -   Endpoint: `http://localhost:5000/api/login`
    -   Method: `POST`
    -   Description: Used for user login.
-   Add Webhook URL Destination

    -   Endpoint: `http://localhost:5000/api/dest/register`
    -   Method: `POST`
    -   Description: Used to add a webhook URL destination.
-   Get Destinations for Logged User

    -   Endpoint: `http://localhost:5000/api/dest/getDestinations?id=${logged_user_id}`
    -   Method: `GET`
    -   Description: Retrieves the destinations associated with the logged-in user.
-   Pay using the App

    -   Endpoint: `http://localhost:5000/api/pay`
    -   Method: `POST`
    -   Description: Initiates a payment. The API will trigger a webhook callback.

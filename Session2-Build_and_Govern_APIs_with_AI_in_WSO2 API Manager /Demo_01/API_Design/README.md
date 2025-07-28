# Use Case 01 - API Design

## Step 1: Design API Using AI

With AI services enabled, you can now design your API effortlessly.

1. Log in to the API Publisher at: `https://<hostname>:9443/publisher` as **Adam** using the assigned password.
2. In the API Publisher, click **Create API with AI**.
3. A text box will appear where you can describe your API in natural language. Enter the below prompt:

   > "I have an old system managing my product inventory, but it’s outdated and needs to be modernised. I need an API that can efficiently handle products and their details - name, description, price, images, etc. while ensuring stock levels stay in sync.
   > Include a way to manage inventory adjustments so stock stays accurate across different locations or sales channels."

4. Click **Create API**, and the AI will create:
   - **API name** - Product Mgt API
   - **Context path** - `/productmgt`
   - **Version** - `1.0.0`
   - **Gateway Type** - Universal Gateway

5. Once finalized, click **Create**.

## Step 2: Configure API Endpoints

After designing the API, configure the backend service to handle requests.

1. Navigate to **API Configurations → Endpoints** in the **Develop** tab.
2. Choose **HTTP/REST** as the endpoint type.
3. Select **Production & Sandbox Endpoints**.
4. Enter the backend URL where the API should forward requests:
   ```
   https://ecad9e6b-e034-43ac-a3a0-46553e637d00-dev.e1-us-east-azure.choreoapis.dev/default/product-api/v1.0
   ```
5. Click **Save**.

## Step 3: Apply API Security

To secure your API, follow these steps:

1. Navigate to **API Configurations → Runtime** in the **Develop** tab.
2. Enable **OAuth 2.0 authentication** to require API consumers to authenticate under **Application Level Security**.
3. Click **Save**.

## Step 4: Implement Rate Limiting Policies

To prevent API abuse and control traffic, set up rate limiting policies:

1. Navigate to **API Configurations → Resources** in the **Develop** tab.
2. Select **API Level** under **Rate Limiting Level**.
3. Select the **10KPerMin** policy level for overall API traffic.
4. Click **Save**.

## Step 5: Add API Documentation

Good API documentation helps developers understand how to use the API.

1. Navigate to **Portal Configurations → Documents** in the **Develop** tab.
2. Click **Add New Document**.
3. Choose **Inline** as the document type.
4. Provide a title and description.
5. Add the below content:

```
Product Mgt API Documentation

The Product Mgt API provides endpoints to manage products and adjust their inventory. It supports the following operations: Add a product, Retrieve a product, Update a product, Delete a product, and Adjust product inventory.

Using the Product Mgt API to Build Apps

You can use the Product Mgt API to build various applications, whether they are web apps, mobile apps, or backend systems. Here’s how you can use the API in your application:

1. Integrating API Calls in Your App

You can integrate the Product Mgt API by making HTTP requests to the endpoints mentioned above. Use GET to retrieve product data, POST to create products, and PUT or DELETE to update or remove products. Use the Adjust Inventory endpoint to track inventory changes.

2. Building a User Interface

For web or mobile applications, you can build a user-friendly interface where users can view product information, add new products, and manage inventory.  You can integrate these operations into your frontend (React, Angular, etc.) and send requests to your backend server (Node.js, Python, etc.) that interacts with the Product Mgt API.

3. Handling Errors and Responses

Ensure your app properly handles different API responses. If a product is created successfully, show a success message; if there’s an error (e.g., invalid data or missing authorization), display an appropriate error message to the user.

4. Real-Time Inventory Updates

In an application that tracks product inventory, use the Adjust Inventory endpoint to allow for real-time updates to product quantities. This could be useful in applications like e-commerce platforms or warehouse management systems where inventory levels change frequently.
By using the Product Mgt API, you can easily integrate product and inventory management into your application, enabling seamless workflows for your users. 
```

6. Click **Save**.

## Step 6: Configure Subscription Policies with Business Plans

1. Navigate to **Portal Configurations → Subscriptions** in the **Develop** tab.
2. Attach **Gold (Allows 5000 requests per minute)** and **Bronze (Allows 1000 requests per minute)** as the **Business Plans** for the API.
3. Click **Save**.

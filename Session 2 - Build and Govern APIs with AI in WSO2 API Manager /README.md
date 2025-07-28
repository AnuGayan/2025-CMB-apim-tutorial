# Session 2 - Build and Govern APIs with AI in WSO2 API Manager 

As APIs continue to evolve, AI is transforming how they are designed, consumed, and governed. By integrating AI-driven capabilities, organizations can streamline workflows, enhance automation, and ensure compliance—making API management more intelligent, efficient, and adaptive.

This session explores how AI can be applied across the API lifecycle, from intelligent design recommendations to optimizing consumption patterns and enforcing governance policies. Through real-world examples, we will demonstrate how AI enhances API interactions, automates compliance, strengthens security, and integrates seamlessly with development workflows.

By the end of this session, you will gain valuable insights into leveraging AI for API management, balancing automation with governance, and building smarter, more secure API ecosystems. Whether you're an API developer, architect, or platform engineer, this session will provide practical strategies for the future of AI-enhanced API management.

## Problem Statement

**Lodgr** team manages a growing ecosystem of APIs for hotel operations including booking, billing, guest management, and housekeeping.
With rapid expansion, they face challenges such as inconsistent documentation, delayed detection of anomalies, and manual policy enforcement across services.
As the number of APIs scales, maintaining quality, reliability, and security becomes increasingly difficult without intelligent, automated oversight.


## Solution

**Lodgr** wants to modernize by implementing APIs for real-time synchronization of product details (description, price, stock) across platforms, ensuring seamless inventory management, consistency, and accuracy.

## Use Cases

By following along this lab session, you will be covering the following use cases:

1. [Use Case 01 - API Design (API Security, Rate Limiting, API documentation covered here)]()
2. [Use Case 02 - API Governance]()
3. [Use Case 03 - Deploy and Publish API]()
4. [Use Case 04 - API Discovery and Subscription]()
5. [Use Case 05 - API Testing]()
6. [Use Case 06 - B2B API Consumption]()
7. [Use Case 07 - API Branding for the Developer Portal]()

## Prerequisites

### Step 1: Sign in to the AI Subscription Portal

Before using AI-assisted API design, you must subscribe to WSO2’s AI services.

1. Navigate to the [AI Subscription Portal](https://ai-subscriptions.wso2.com).
2. Sign in with your WSO2 credentials. If you don’t have an account, register for one.
3. Subscribe to the AI services by clicking on **New Subscription**. Ensure to select **wso2am** as the product.
4. Keep this key secure, as it will be required to enable AI features in WSO2 API Manager.

### Step 2: Install, Configure and Run WSO2 API Manager

#### 2.1 Install WSO2 API Manager

1. Download WSO2 API Manager (version 4.5.0) from the WSO2 official site.
2. Extract the package to your preferred directory. For example:
   
   **On Linux/macOS:**
   ```sh
   tar -xvf wso2am-4.5.0.tar.gz
   cd wso2am-4.5.0/bin
   ```
   
   **On Windows:** Extract the ZIP file and navigate to the `bin` directory.

#### 2.2 Configure the `deployment.toml` file

1. Open the `deployment.toml` file located at:
   ```
   <WSO2_HOME>/repository/conf/deployment.toml
   ```

2. Enable AI features by adding the following configuration:
   
   ```toml
   [apim.ai]
   enable = true
   endpoint = "https://dev-tools.wso2.com/apim-ai-service/v2"
   key = "<key that you obtained from the ai subscription portal>"
   token_endpoint = "https://api.asgardeo.io/t/wso2devtools/oauth2/token"
   ```

3. Save the `deployment.toml` file.

#### 2.3 Run the WSO2 API Manager Server

After saving the changes, start the WSO2 API Manager:

**On Linux/macOS:**
```sh
sh wso2server.sh
```

**On Windows:**
```sh
wso2server.bat
```

Once the server starts, you can access the below listed protals:

- **API Publisher:** `https://<hostname>:9443/publisher/`
- **Developer Portal:** `https://<hostname>:9443/devportal/`
- **Admin Portal:** `https://<hostname>:9443/admin/`
- **Management Console:** `https://<hostname>:9443/carbon/`

### Step 3: Create Users

1. Log in to the Management Console at: `https://<hostname>:9443/carbon`
2. Create the following user personas and assign them the appropriate roles:

    | Username | Role |
    |----------|-----------------------------|
    | Adam     | API Owner (Internal/creator) |
    | Juliya   | API Product Manager (Internal/publisher) |
    | Jacob    | Partner App Developer (Internal/subscriber) |
    | Ryan     | System Admin (admin) - This is already created by default |
    | orgadmin | Organization Admin (admin and everyone) |

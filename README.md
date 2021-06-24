HTML/CSS -> Javascript (main.js) -> Azure Function (GetResumeCounter.cs) -> Azure Cosmos DB

# Azure Cosmos DB:
- Resource Group: azureresume-rg
- Account Name: azureresume-act
- Capacity Mode = Serverless
- Database Name = AzureResume
- Container id: Counter
- Partition key: /id
- {
  "id":"1",
  "count":0
}
- AzureResumeConnectionString = Primary Connection String from Azure Cosmos DB Account


# Add Azure Cosmos DB bindings for Azure Functions
https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2

C# Lanuage, Add by... -> Installing NuGet package in your /api directory
.NET CLI -> https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.CosmosDB
Run the command in backend/api

# Create Azure Function
- Under Azure Functions extension, Click "Deploy to function app"
- Function Name: AzureResumeFunctionApp
- Storage Account: azureresumestorage0
- App Insights: azureresumeappinsights
- NOTE: Under Azure Functions Extension, you don't need to have the "Local Projects' director opened. Every all the files are ready to be deployed, click 'Deploy to Function App'. If the function app is already deployed, clean out everything again, right click your existing function app and click 'Deploy to Function App'
- After Azure Function App is deployed, update the Functions Secrets in the portal
  - Go to your Function App in Azure portal, click on Configuration
  - Add AzureResumeConnectionString annd Value (Cosmos DB Primary Connection String)
  - Get Function URL: https://azureresumefunctionapp1.azurewebsites.net/api/GetResumeCounter?code=cFhxvlw9uAphBJq5Ro1oyMdKWbGpb/ZgJOarV9OgPagxcAoobY1SpA==
  - Enable CORS in Azure Portal
  - Need to add domain name into "Allowed Origins" under CORS section

  # Deploy to static website via Azure Storage
  - Storage Account: azureresumesa
  - Resource Group: azureresume-rg
  - Blob Storage Website URL : https://azureresumestorage3.z13.web.core.windows.net/
  - Paste our url into the CORS section under 'Allowed Origins'

  # Create Azure CDN
  - Select Storage Account azureresumestorage3
  - Create new CDN profile - azureresumerichard
  - The CDN Endpoint Hostname https://azureresumerichard.azureedge.net that's created here won't work at first because the CORS was only enabled for the blog storage URL (above).
  - CURRENT STEP: Changed the CNAME record to point to the new CDN Endpoint in Google domains. Waiting to see what happens. Also need to add the custom hostname into the CDN Endpoint on Azure.
  - https://www.youtube.com/watch?v=ieYrBWmkfno : 1:02:30

  - What to do with the CDN Endpoint? https://azureresumerichard.azureedge.net/

  - Steps:
  Create a CNAME DNS record.
    - Create a CDN Profile - DONE - azureresumerichard
    - Create a CDN Endpoint - DONE -  https://azureresumerichard.azureedge.net/
    - Map the temporary cdnverify subdomain - DONE
    - Enable custom domain HTTPS under CDN Endpoint - DONE
    - Add https://www.richardkwong.me url to CORs in Azure Function.
    - Map the permanent customer domain - NOT DONE
    - https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain?tabs=azure-dns%2Cazure-portal%2Cazure-portal-cleanup

  Associate the custom domain with your CDN endpoint.
  Verify the custom domain.



# azure-resume
https://www.youtube.com/watch?v=ieYrBWmkfno

## First steps

- Frontend folder contains the website.
- main.js contains the visitor counter code.

- Create Azure Portal Account
- Create Azure Cosmos DB Account
    - Create Resource Group
    - Set SERVERLESS capacity mode (Only pay when the API gets traffic)
- Create Azure Cosmos Database/Container
    Note: A partition key is a field that is used to distinguish from the diferent items in your container

- Azure Functions - 
    - Serverless solution that allows use to create pieces of code that are event driven and we dont' have to worry about the infrastrasture behind those pieces of code.
    - Has "bindings" which allows us to connect other resoruces to our function.

- "Create New Project" under Azure Functions extension in Visual Studio Code
    - Select backend/api
    - Select C# - .NET Core 3
    - HTTP Trigger for the template
    - Check your .NET version with: dotnet --version
        - Currently on 2.1.403, need to upgrade to 3.1
        - Run inside the /api folder 'func host start'
        - Use this command to fix any issues when running the cmd above:
            - Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted


- Add the following local.settings.json file in the backend folder if running locally.
- local.settings.json is in the gitignore and won't be pushed up

{
    "IsEncrypted": false,
    "Values": {
      "AzureWebJobsStorage": "",
      "FUNCTIONS_WORKER_RUNTIME": "dotnet",
      "AzureResumeConnectionString": ""
    },
    "Host": 
    {
      "CORS": "*"
    }
  }

  - Website uploaded to Azure Blob Storage
 

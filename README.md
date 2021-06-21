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
- After Azure Function App is deployed, update the Functions Secrets in the portal
  - Go to your Function App in Azure portal, click on Configuration
  - Add AzureResumeConnectionString annd Value (Cosmos DB Primary Connection String)
  - Get Function URL: https://azureresumefunctionapp.azurewebsites.net/api/GetResumeCounter?code=/DEwLan0sLByJJwYQx2fguer8URrYS/4aGEgO4w9bnL2Zm4Gs7Nq1w==
  - Enable CORS in Azure Portal
  - Need to add domain name into "Allowed Origins" under CORS section

  # Deploy to static website via Azure Storage
  - Storage Account: azureresumesa
  - Resource Group: azureresume-rg
  - Blob Storage Website URL : https://azureresumesa.z13.web.core.windows.net/
  - Paste our url into the CORS section under 'Allowed Origins'

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
 

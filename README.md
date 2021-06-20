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
      "AzureResumeConnectionString": "AccountEndpoint=https://azure-resume-project.documents.azure.com:443/;AccountKey=2l46GERFmpjbUwBQlyfgMt05DIUClo6t44xemjqQg6jK8H5zWJaiS4XMiOh45J4OOWyrJ1NRsRej8C5kYA77Ug==;"
    },
    "Host": 
    {
      "CORS": "*"
    }
  }

  - Website uploaded to Azure Blob Storage
  - https://azureresume1.z13.web.core.windows.net/

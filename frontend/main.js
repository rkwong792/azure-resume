window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const prodFunctionApi = 'https://azureresumefunctionapp1.azurewebsites.net/api/GetResumeCounter?code=cFhxvlw9uAphBJq5Ro1oyMdKWbGpb/ZgJOarV9OgPagxcAoobY1SpA==';
const localFunctionApi = 'http://localhost:7071/api/GetResumeCounter';
//Grab the JSON from that API above
//Grab the correct part of the JSON and show it in our HTML

//Call our API @ prodFunctionApi
//It will return a JSON response.
//Set our HTML's innerText with the count we got from the JSON response from the API
const getVisitCount = () => {
    let count = 30;
    fetch(prodFunctionApi)
    .then(response => {
        return response.json()
    })
    .then(response => {
        console.log("Website called function API.");
        count = response.count;
        document.getElementById('counter').innerText = count;
    }).catch(function(error) {
        console.log(error);
      });
    return count;
}
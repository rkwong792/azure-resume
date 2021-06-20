window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionApi = 'http://localhost:7071/api/GetResumeCounter';
//Grab the JSON from that API above
//Grab the correct part of the JSON and show it in our HTML

//Call our API @ functionAPI
//It will return a JSON response.
//Set our HTML's innerText with the count we got from the JSON response from the API
const getVisitCount = () => {
    let count = 30;
    fetch(functionApi)
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
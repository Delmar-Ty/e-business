//Script initializes names and checks whether data is already fetched

let dataExists = false;
const file = 'assets/JSON/product-data.json';
let storageName = (sessionStorage.dataKey)? sessionStorage.dataKey: 'product-data';
const evt = new Event('init');

//This fetches the data
async function getData(resource) {
    let response = await fetch(resource);
    let data = await response.json();
    return data;
}

//Saves data to local storage and parses data
function saveData(name = "list", data) {
    sessionStorage.setItem(name, JSON.stringify(data));
}

//Init the name of the key that will be used to store the JSON data
function saveName(name) {
    if (sessionStorage.getItem('dataKey') !== name) {
        sessionStorage.setItem('dataKey', name);
    }
}
saveName(storageName);

//Check to see if data already exists in local storage
function checkData() {
    if (sessionStorage[storageName]) {
        console.log('Data Exists');
        dataExists = true;
        document.dispatchEvent(evt);
    } else {
        getData(file)
            .then(data => {
                saveData(storageName, data);
                console.log('Created Data');
                dataExists = true;
                document.dispatchEvent(evt);
            })
            .catch(err => console.error(err));
    }
}

checkData();
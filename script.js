//your JS code here. If required.
function createRandomPromise(index) {
    const time = Math.random() * 2000 + 1000; // Random time between 1000ms (1s) and 3000ms (3s)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ index: index, time: (time / 1000).toFixed(3) });
        }, time);
    });
}

// Getting the table element
const table = document.getElementById('promise-table');

// Function to add a row to the table
function addRow(column1, column2) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = column1;
    cell2.textContent = column2;
}

// Creating an array of 3 promises
const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3)
];

// Adding the loading row
const loadingRow = table.rows[0];
loadingRow.cells[0].setAttribute('colspan', '2');
loadingRow.cells[0].textContent = 'Loading...';

// Using Promise.all to wait for all promises to resolve
const startTime = Date.now();
Promise.all(promises)
    .then(results => {
        // Calculating the total time taken
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(3);

        // Removing the loading row
        table.deleteRow(0);

        // Adding the results to the table
        results.forEach(result => {
            addRow(`Promise ${result.index}`, result.time);
        });

        // Adding the total time row
        addRow('Total', totalTime);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
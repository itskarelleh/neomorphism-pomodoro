export function parseDataFromLocalStorage(key) {
    // Retrieve the data from local storage
    const data = localStorage.getItem(key);

    // Check if data exists
    if (!data) {
        console.log('No data found in local storage for key:', key);
        return [];
    }

    try {
        // Parse the JSON data
        const parsedData = JSON.parse(data);

        // Here, you can use the parsedData as required by your app
        // For example, return it or log it to the console
        return parsedData;
    } catch (error) {
        console.error('Error parsing JSON from local storage:', error);
        return [];
    }
}

// Usage
const key = 'yourLocalStorageKey'; // Replace with the actual key used in local storage
const parsedData = parseDataFromLocalStorage(key);
console.log(parsedData);

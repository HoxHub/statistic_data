console.log('JavaScript file loaded successfully!');

document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here
    const yearsSelect = document.getElementById('years');
    const fylkerSelect = document.getElementById('fylker');
    
    // Function to handle double-click event for multiple selection and highlighting
    function handleDoubleClick(event) {
        const option = event.target;
        if (option.tagName === 'OPTION') {
            option.selected = !option.selected;
            option.classList.toggle('highlighted');
        }
    }

    // Adding event listeners for År and Fylker dropdown lists
    yearsSelect.addEventListener('dblclick', handleDoubleClick);
    fylkerSelect.addEventListener('dblclick', handleDoubleClick);

    // Define the API endpoint
    const apiUrl = 'https://data.ssb.no/api/v0/no/table/11342/'; // Replace 'https://api.example.com/data' with your actual API endpoint

    // Function to fetch data based on selected values
    async function fetchData(selectedYears, selectedRegions, selectedParameter) {
        const url = `${apiUrl}?years=${selectedYears.join(',')}&regions=${selectedRegions.join(',')}&parameter=${selectedParameter}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
    
            console.log('Response Data:', data); // Log the entire response data
    
            // Check if the data contains the expected structure
            if (data && data.value && Array.isArray(data.value)) {
                console.log('Collected data:', data.value); // Log the collected data
    
                displayResult(data.value); // Call the displayResult function
    
                return data.value; // Return the array of values
            } else {
                console.error('Invalid response data structure:', data);
                return null;
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    }
        

    // Function to display the result
    function displayResult(resultData) {
        console.log('Result data:', resultData); // Log the resultData object

        // Show the result section
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';

        // Clear any previous content
        resultDiv.innerHTML = '';

        // Display the result
        if (Array.isArray(resultData)) {
            const ul = document.createElement('ul');
            resultData.forEach(parameter => {
                const li = document.createElement('li');
                li.textContent = parameter;
                ul.appendChild(li);
            });
            resultDiv.appendChild(ul);
        } else {
            const p = document.createElement('p');
            p.textContent = 'No data available';
            resultDiv.appendChild(p);
        }
    }
    
        
    document.getElementById('calculator-form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        console.log('Form submitted!'); // Add this line for debugging
    
        const selectedYears = Array.from(document.getElementById('years').selectedOptions).map(option => option.value);
        const selectedRegions = Array.from(document.getElementById('fylker').selectedOptions).map(option => option.value);
        const selectedParameter = document.getElementById('parameter').value;
    
        console.log('Selected years:', selectedYears); // Log the selected years
        console.log('Selected regions:', selectedRegions); // Log the selected regions
        console.log('Selected parameter:', selectedParameter); // Log the selected parameter
    
        // Fetch data based on selected values
        const resultData = await fetchData(selectedYears, selectedRegions, selectedParameter);
    });
});

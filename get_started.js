document.addEventListener('DOMContentLoaded', function () {
    const yearsSelect = document.getElementById('years');
    const regionsSelect = document.getElementById('fylker');
    const parameterSelect = document.getElementById('parameter');
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');

    // Function to handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get selected values
        const selectedYears = Array.from(yearsSelect.selectedOptions).map(option => option.value);
        const selectedRegions = Array.from(regionsSelect.selectedOptions).map(option => option.value);
        const selectedParameter = parameterSelect.value;

        // Fetch data based on selected values
        const resultData = fetchData(selectedYears, selectedRegions, selectedParameter);

        // Display the result
        displayResult(resultData);
    });

    // Function to fetch data based on selected values
    function fetchData(selectedYears, selectedRegions, selectedParameter) {
        // Use selected values to retrieve data from jsonData
        // Implement your logic here to fetch data based on the selected parameters
        // For now, let's just return a dummy result
        return {
            average: 100 // Example dummy value
        };
    }

    // Function to display the result
    function displayResult(resultData) {
        // Show the result section
        resultDiv.style.display = 'block';
        // Display the result
        document.getElementById('average').textContent = `Average: ${resultData.average}`;
    }
});
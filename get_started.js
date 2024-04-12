document.addEventListener('DOMContentLoaded', function () {
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
});

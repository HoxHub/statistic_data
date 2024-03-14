function inputsAreEmpty() {
    if (getNumber1() === '' || getNumber2() === '') {
        return true;
    } else {
        return false;
    }
}

function updateLabel() {
    var addend1 = parseFloat(getNumber1());
    var addend2 = parseFloat(getNumber2());
    var sum = addend1 + addend2;
}

function getNumber1() {
    return inputs[0].value;
}

function getNumber2() {
    return inputs[1].value;
}

var inputs = document.querySelectorAll('input');
var label = document.querySelector('p');

document.getElementById("start").onclick = function() {
    console.log("You pressed start");
    if (inputsAreEmpty()) {
        label.textContent = 'Error. You must have two numbers';
        return;
    }
    const url = 'http://localhost:8080/start';

    const data = {
        parameter1: parseFloat(getNumber1()),
        parameter2: parseFloat(getNumber2())
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data_r => {
        console.log('POST-request sent to Start-resource:', data_r);
        console.log(`Print ${data_r}`);
        if (data_r) {
            if (data_r.average) {
                var p = data_r.average;
                label.textContent =
                "Average is " + p;
            }
            else label.textContent = 'Average is false'
        }
        else label.textContent = 'Data is false';
    })
    .catch(error => {
        console.error('Failed to send POST-request:', error);
    });
};

document.getElementById("stop").onclick = function() {
    const url = 'http://localhost:8080/ready';
    console.log("You pressed Stop " + url);
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log('GET-request sent to Stop-resource:', result);
    })
    .catch(error => {
        console.error('Failed to send GET-request:', error);
    });
};

document.getElementById("continue").onclick = function() {
    console.log("You pressed Continue");
};

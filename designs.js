// Select color input
const colorInput = document.querySelector("#colorPicker");

// Select form and table
const form = document.querySelector("#sizePicker");
const table = document.querySelector('#pixelCanvas');

const errorElement = document.querySelector('#errorMessage');

var x;
var y;
var canDrawGrid;

form.addEventListener("submit", function (event) {
	// we stop the form submission here
	event.preventDefault();

	// set value of x and y to the value gotten from the input
	x = validInput(form.elements["inputWidth"]);
	y = validInput(form.elements["inputHeight"]);

    if (canDrawGrid) {
        // check to see if a grid already exist and clear it,
        // this can serve as a reset for the grid if same inputs are passed.
        if (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        };
        makeGrid()
    };
});


function validInput (input) {
    // Function to validate input and ensure the user enters a reasonable value
    var inputValue = input.value;
    var convertedInputValue = Number(inputValue);
    if (convertedInputValue > 50 || convertedInputValue < 2) {
        console.log("yes")
        input.setAttribute('style', 'border: 1px solid red;');
        errorElement.textContent = "input cannot be more than 100 or less than 2";
        canDrawGrid = false;
    } else {
        input.setAttribute('style', 'border: 1px solid black;');
        errorElement.textContent = "";
        canDrawGrid = true;
    };
    return input.value;
};


// When size is submitted by the user, call makeGrid()

function makeGrid() {
    // Your code goes here!
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (row=0; row<x; row++) {
        // create a new row that would hold the columns
        var newRow = document.createElement('tr');
        for (col=0; col<y; col++) {
            var newCol = document.createElement("td");
            newRow.appendChild(newCol);
        };
        tbody.appendChild(newRow);
    };

    table.addEventListener('click', function (event) {
        var color = colorInput.value;
        // when the mouse is double tapped and dragged over the table
        // the entire row or entire table is colored which is not meant
        // to be the behavior. The condition below ensures that the
        // target is a td element before it applies the color.
        if (event.target.localName === "td") {
            event.target.style.backgroundColor = color;
        };
    });
}

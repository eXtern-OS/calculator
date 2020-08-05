var win = nw.Window.get();

//win.showDevTools();

var index = 0;
var numbers = [new Big(0)];
var normalNumber = true;
var firstNumber = true;

$(document).ready(() => {
	$(document).on("keydown", (e) => {
		if (/^([0-9]*)$/.test(e.key)) addNumber(e.key);
		if (e.keyCode == 8) removeNumber();
		if (e.keyCode == 107) nextNumber("+");
		if (e.keyCode == 109) nextNumber("-");
		if (e.keyCode == 106) nextNumber("*");
		if (e.keyCode == 111) nextNumber("/");
		if (e.keyCode == 13) operationCalculate();
		if (e.keyCode == 46) clearEntry();
	});
});

function addNumber(number) {
	if (!normalNumber) numbers[index] = new Big(0);
	normalNumber = true;
	numbers[index] = numbers[index].times(10).plus(Number(number));
	$("#calcEntry").val(numbers[index]);
}

function removeNumber() {
	numbers[index] = numbers[index].div(10);
	numbers[index] = Big(Math.floor(numbers[index]));
	$("#calcEntry").val(numbers[index]);
}

function addPi() {
	numbers[index] = Math.PI;
	$("#calcEntry").val(numbers[index]);
	normalNumber = false;
}

function clearEntry() {
	numbers[index] = new Big(0);
	$("#calcEntry").val(numbers[index]);
}

function clearAll() {
	numbers = [];
	index = 0;
	clearEntry();
	firstNumber = true;
	$("#calcOperations").val(" ");
}

function nextNumber(sign) {
	$("#calcOperations").val(function () {
		return this.value
			? this.value + numbers[index] + " " + sign + " "
			: numbers[index] + " " + sign + " ";
	});
	numbers[++index] = new Big(0);
	calculate();
}

function operationCalculate() {
	calculate();
	$("#calcOperations").val("");
}

function calculate() {
	$("#calcEntry").val(() => {
		if (!firstNumber)
			return new Big(Number(eval($("#calcOperations").val() + numbers[index])));
		firstNumber = false;
		return numbers[index];
	});

	numbers = [new Big(0)];
	index = 0;
}

function exp() {
	$("#calcEntry").val(() => {
		return numbers[index] + '.e+0';
	});
}

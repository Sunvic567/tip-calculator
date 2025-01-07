// Get DOM elements
const bill = document.getElementById('bill');
const noOfPeople = document.getElementById('people');
const resetBtn = document.getElementById('resetBtn');
const errorMsg = document.getElementById('err');
const inputTip = document.querySelector('.tip-amt');
const inputTotal = document.querySelector('.total-amt');
const tipButtons = document.querySelectorAll('.select-tip .container p');
const custom = document.querySelector('.custom');

// Keep track of selected tip percentage
let selectedTipPercentage = 0;

function tipCalc(tipPercentage = selectedTipPercentage) {
    let billAmount = parseFloat(bill.value) || 0;
    let numOfPeople = parseFloat(noOfPeople.value) || 0;
    
    // Validate number of people
    if (numOfPeople === 0) {
        errorMsg.style.display = 'block';
        return false;
    }
    errorMsg.style.display = 'none';

    // Calculate tip and total
    const tipAmount = (billAmount * (tipPercentage / 100)) / numOfPeople;
    const totalBill = (billAmount / numOfPeople) + tipAmount;

    // Display results
    inputTip.value = `$${tipAmount.toFixed(2)}`;
    inputTotal.value = `$${totalBill.toFixed(2)}`;

    return true;
}

// Event listeners for tip buttons
tipButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedTipPercentage = parseFloat(e.target.textContent);
        tipCalc(selectedTipPercentage);
    });
});

// Event listeners for input fields
bill.addEventListener('input', () => tipCalc());
noOfPeople.addEventListener('input', () => tipCalc());
custom.addEventListener('input', (e) => {
    selectedTipPercentage = parseFloat(e.target.value) || 0;
    tipCalc(selectedTipPercentage);
});

// Reset functionality
resetBtn.addEventListener('click', () => {
    bill.value = '';
    noOfPeople.value = '';
    custom.value = '';
    inputTip.value = '$0.00';
    inputTotal.value = '$0.00';
    errorMsg.style.display = 'none';
    selectedTipPercentage = 0;
});
document.getElementById('calculateButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Check for missing fields
    if (!validateInputs()) {
        $('#errorModal').modal('show'); // Show the error modal if inputs are invalid
        return;
    }

    calculate();
    saveToLocalStorage();
    window.location.href = 'results.html'; // Redirect to results.html
});

function validateInputs() {
    const loanAmount = document.getElementById('loanAmount').value;
    const downPayment = document.getElementById('downPayment').value;
    const mortgageTerm = document.getElementById('mortgageTerm').value;
    const interestRate = document.getElementById('interestRate').value;

    return loanAmount && downPayment && mortgageTerm && interestRate;
}

function calculate() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const mortgageTerm = parseFloat(document.getElementById('mortgageTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);

    const principal = loanAmount - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = mortgageTerm;

    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    const monthlyPayment = numerator / denominator;

    // Save results to local storage
    localStorage.setItem('monthlyPayment', monthlyPayment.toFixed(2));
    localStorage.setItem('totalPrincipal', principal.toFixed(2));
    localStorage.setItem('totalInterest', (monthlyPayment * numberOfPayments - principal).toFixed(2));
    localStorage.setItem('totalAmount', (parseFloat(principal.toFixed(2)) + parseFloat((monthlyPayment * numberOfPayments - principal).toFixed(2))).toFixed(2));
}

function saveToLocalStorage() {
    const loanAmount = document.getElementById('loanAmount').value;
    const downPayment = document.getElementById('downPayment').value;
    const mortgageTerm = document.getElementById('mortgageTerm').value;
    const interestRate = document.getElementById('interestRate').value;

    localStorage.setItem('loanAmount', loanAmount);
    localStorage.setItem('downPayment', downPayment);
    localStorage.setItem('mortgageTerm', mortgageTerm);
    localStorage.setItem('interestRate', interestRate);
}

// Optionally, you can add code to populate the form with stored values when the page loads
window.addEventListener('load', function() {
    const storedLoanAmount = localStorage.getItem('loanAmount');
    const storedDownPayment = localStorage.getItem('downPayment');
    const storedMortgageTerm = localStorage.getItem('mortgageTerm');
    const storedInterestRate = localStorage.getItem('interestRate');

    if (storedLoanAmount) document.getElementById('loanAmount').value = storedLoanAmount;
    if (storedDownPayment) document.getElementById('downPayment').value = storedDownPayment;
    if (storedMortgageTerm) document.getElementById('mortgageTerm').value = storedMortgageTerm;
    if (storedInterestRate) document.getElementById('interestRate').value = storedInterestRate;
});

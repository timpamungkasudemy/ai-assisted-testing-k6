export function calculateMonthlyInstallment(loanAmount, tenureInMonths, annualInterestRate) {
    let monthlyInterestRate = annualInterestRate / 12 / 100;
    let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -tenureInMonths));

    return Math.round(monthlyPayment * 100) / 100;
}
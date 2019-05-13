// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//   Calculate results

function calculateResults() {
  // UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //show results
    document.getElementById("results").style.display = "block";

    // hide spinner
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// ShowError function

function showError(error) {
  //show results
  document.getElementById("results").style.display = "none";

  // hide spinner
  document.getElementById("loading").style.display = "none";

  // create a div
  const errorDiv = document.createElement("div");

  // add class
  errorDiv.className = "alert alert-danger";

  //   grab two elements

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert the error text node above heading.
  card.insertBefore(errorDiv, heading);

  //   clear error after 2 secs
  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector(".alert").remove();
}

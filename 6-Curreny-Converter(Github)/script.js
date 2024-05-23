const fromAmount = document.querySelector(".amount");
const convertedAmount = document.querySelector(".convertedAmount");
const fromCurrency = document.querySelector(".fromCurrency");
const toCurrency = document.querySelector(".toCurrency");
const result = document.querySelector(".result");
const converterContainer = document.querySelector(".converter_container");

//Array to populate the select tags with these countries
const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "KRW", name: "South Korean Won" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "KWD", name: "Kuwaiti Dinar" },
];

// Showing countries from array to select tags
countries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = country.code;
  option2.value = country.code;
  option1.textContent = `${country.code} (${country.name})`;
  option2.textContent = `${country.code} (${country.name})`;

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

// Setting default values of select tags
fromCurrency.value = "USD";
toCurrency.value = "INR";


// Function to get exchange rate using API
const getExchangeRate = async () => {
  const amount = parseFloat(fromAmount.value);
  const formCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;
  result.textContent = "Fetching Exchange Rates..";

  try {
    // Fetching data from API
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${formCurrencyValue}&to=${toCurrencyValue}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host":
          "YOUR_API_HOST",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);

    const conversionRate = data.rates[toCurrencyValue];
    const convertedAmountValue = (amount * conversionRate).toFixed(2);

    if (typeof conversionRate === "undefined") {
      result.textContent =
        "Exchange rate data is not available for selected countries !!";
      convertedAmount = "";
    } else {
      convertedAmount.value = convertedAmountValue;

      result.textContent = `${amount} ${formCurrencyValue} = ${convertedAmountValue} ${toCurrencyValue}`;
    }
  } catch (error) {
    converterContainer.innerHTML =
      "<h2>Error While Fetching Exchnage Rates !!!</h2>";
  }
};

// FETCHING EXCHANGE RATES WHEN USER INPUT THE AMOUNT
fromAmount.addEventListener("input", getExchangeRate);

// FETCHING EXCHANGE RATES WHEN USER CHANGE CURRENCY
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);

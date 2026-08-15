const lengthUnits = ["Millimeter", "Centimeter", "Meter", "Kilometer", "Inch", "Foot", "Yard", "Mile"];
const weightUnits = ["Milligram", "Gram", "Kilogram", "Ounce", "Pound"];
const temperatureUnits = ["Celsius", "Fahrenheit", "Kelvin"];

function updateDropdown(list) {
    const convertFromDropdown = document.getElementById("convertFrom");
    const convertToDropdown = document.getElementById("convertTo");

    convertFromDropdown.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("");
    convertToDropdown.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("");
}

document.getElementById("lengthButton").addEventListener("click", () => updateDropdown(lengthUnits));
document.getElementById("weightButton").addEventListener("click", () => updateDropdown(weightUnits));
document.getElementById("temperatureButton").addEventListener("click", () => updateDropdown(temperatureUnits));

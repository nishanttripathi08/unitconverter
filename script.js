const lengthUnits = ["Millimeter", "Centimeter", "Meter", "Kilometer", "Inch", "Foot", "Yard", "Mile"];
const weightUnits = ["Milligram", "Gram", "Kilogram", "Ounce", "Pound"];
const temperatureUnits = ["Celsius", "Fahrenheit", "Kelvin"];

const convertFromDropdown = document.getElementById("convertFrom");
const convertToDropdown = document.getElementById("convertTo");
const amountElement = document.getElementById("amountOfUnit");
const fromUnitElement = document.getElementById("convertFrom");
const toUnitElement = document.getElementById("convertTo");

var version = "length"

function updateDropdown(list, newVersion) {
    this.version = newVersion
    convertFromDropdown.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("");
    convertToDropdown.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("");
}

function reset() {
    amountElement.style.display = "block"
    fromUnitElement.style.display = "block"
    toUnitElement.style.display = "block"
    document.getElementById("convert").style.display = "block"
    document.getElementById("amountOfUnitLabel").style.display = "block"
    document.getElementById("convertToLabel").style.display = "block"
    document.getElementById("convertFromLabel").style.display = "block"
    document.getElementById("resultLabel").style.display = "none"
    document.getElementById("result").style.display = ""
    document.getElementById("reset").style.display = "none"
}

async function convert() {
    console.log("convert fired");

    const info = {
        amount: amountElement.value,
        version: version,
        from_unit: fromUnitElement.value,
        to_unit: toUnitElement.value
    }
    if (amountElement.value !== "" && Number.isFinite(Number(amountElement.value))) {
        const response = await fetch('http://127.0.0.1:8000/convert', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        });
        amountElement.style.display = "none"
        fromUnitElement.style.display = "none"
        toUnitElement.style.display = "none"
        document.getElementById("convert").style.display = "none"
        document.getElementById("amountOfUnitLabel").style.display = "none"
        document.getElementById("convertToLabel").style.display = "none"
        document.getElementById("convertFromLabel").style.display = "none"
        const data = await response.json();
        document.getElementById("resultLabel").style.display = "block"
        document.getElementById("result").textContent = data
        document.getElementById("reset").style.display = "block"
    } else {
        alert("Enter a valid length(Must be integer or float)")
    }
}

document.getElementById("lengthButton").addEventListener("click", () => updateDropdown(lengthUnits, "length"));
document.getElementById("weightButton").addEventListener("click", () => updateDropdown(weightUnits, "weight"));
document.getElementById("temperatureButton").addEventListener("click", () => updateDropdown(temperatureUnits, "temperature"));

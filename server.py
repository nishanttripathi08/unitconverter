from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

TO_METERS = {
    "Millimeter": 0.001,
    "Centimeter": 0.01,
    "Meter": 1.0,
    "Kilometer": 1000.0,
    "Inch": 0.0254,
    "Foot": 0.3048,
    "Yard": 0.9144,
    "Mile": 1609.344
}

TO_GRAMS = {
    "Milligram": 0.001,
    "Gram": 1.0,
    "Kilogram": 1000.0,
    "Ounce": 28.3495,
    "Pound": 453.592
}

class Info(BaseModel):
    amount: float
    version: str
    from_unit: str
    to_unit: str

@app.post("/convert")
def convert(info: Info) -> float:
    print(info)
    amount = info.amount
    from_unit = info.from_unit
    to_unit = info.to_unit
    match info.version:
        case "length":
            in_meters = amount * TO_METERS[from_unit]
            conversion = in_meters / TO_METERS[to_unit]
            return round(conversion, 3)
        case "weight":
            in_grams = amount * TO_GRAMS[from_unit]
            conversion = in_grams / TO_GRAMS[to_unit]
            return round(conversion, 3)
        case "temperature":
            if from_unit == "Celsius" and to_unit == "Fahrenheit":
                conversion = (amount * 9/5) + 32
                return round(conversion, 3)
            elif from_unit == "Celsius" and to_unit == "Kelvin":
                conversion = amount + 273.15
                return round(conversion, 3)
            elif from_unit == "Fahrenheit" and to_unit == "Celsius":
                conversion = (amount - 32) * 5/9
                return round(conversion, 3)
            elif from_unit == "Fahrenheit" and to_unit == "Kelvin":
                conversion = (amount - 32) * 5/9 + 273.15
                return round(conversion, 3)
            elif from_unit == "Kelvin" and to_unit == "Celsius":
                conversion = amount - 273.15
                return round(conversion, 3)
            elif from_unit == "Kelvin" and to_unit == "Fahrenheit":
                conversion = (amount - 273.15) * 9 / 5 + 32
                return round(conversion, 3)
            else:
                return amount








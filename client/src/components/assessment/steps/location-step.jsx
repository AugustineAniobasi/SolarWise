import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Sun } from "lucide-react";

// Sample sunlight data by country (average daily hours)
const sunlightData = {
  Nigeria: 6.5,
  Ghana: 6.3,
  Kenya: 6.8,
  "South Africa": 8.5,
  Egypt: 9.2,
  Morocco: 8.0,
  Tanzania: 7.5,
  Ethiopia: 8.3,
  Uganda: 6.9,
  Senegal: 8.7,
  Other: 7.0,
};

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Egypt",
  "Morocco",
  "Tanzania",
  "Ethiopia",
  "Uganda",
  "Senegal",
  "Other",
];

export function LocationStep(props) {
  const data = props.data.location;

  const [city, setCity] = useState(data.city || "");
  const [country, setCountry] = useState(data.country || "");
  const [sunlightHours, setSunlightHours] = useState(data.sunlightHours);

  useEffect(() => {
    if (country && sunlightData[country]) {
      console.log(sunlightData[country]);
      setSunlightHours(sunlightData[country]);
      props.updateData({
        location: {
          city,
          country,
          sunlightHours: sunlightData[country],
        },
      });
    }
  }, [country]);

  const handleCityChange = (value) => {
    setCity(value);
    props.updateData({
      location: {
        city: value,
        country,
        sunlightHours,
      },
    });
  };

  const handleCountryChange = (value) => setCountry(value);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Your Location</h2>
        <p>
          We need your location to determine the solar potential in your area
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            placeholder="Enter your city"
            onChange={(event) => handleCityChange(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            defaultValue={country}
            onValueChange={(value) => handleCountryChange(value)}
          >
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {sunlightHours && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <Sun className="h-8 w-8 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Solar Potential</h3>
              <p className="text-gray-600 mb-2">
                Your location receives approximately{" "}
                <strong>{sunlightHours} hours</strong> of sunlight daily on
                average.
              </p>
              <p className="text-sm text-gray-500">
                This is{" "}
                {sunlightHours > 7
                  ? "excellent"
                  : sunlightHours > 5
                  ? "good"
                  : "moderate"}{" "}
                for solar energy generation.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <MapPin className="icon text-neutral-700" />{" "}
        <span>
          Your location information helps us provide accurate solar
          recommendations
        </span>
      </div>
    </div>
  );
}

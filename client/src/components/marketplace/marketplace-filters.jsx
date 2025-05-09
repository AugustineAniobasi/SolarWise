import { useState } from "react";
import { rc } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function MarketplaceFilters(props) {
  const [serviceTypes, setServiceTypes] = useState([
    { name: "Installation", isChecked: false },
    { name: "Maintenance", isChecked: false },
    { name: "Consultation", isChecked: false },
    { name: "Equipment Sales", isChecked: false },
    { name: "Repairs", isChecked: false },
    { name: "System Design", isChecked: false },
  ]);

  // Update isChecked for serviceTypes
  const updateServiceTypes = (serviceName, checked) => {
    setServiceTypes((prevServiceTypes) =>
      prevServiceTypes.map((service) =>
        service.name === serviceName
          ? { ...service, isChecked: checked }
          : service
      )
    );
  };

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [ratings, setRatings] = useState([
    { value: 5, isChecked: false },
    { value: 4, isChecked: false },
    { value: 3, isChecked: false },
    { value: 2, isChecked: false },
    { value: 1, isChecked: false },
  ]);

  // Update isChecked for rating
  const updateRatings = (ratingValue, checked) => {
    setRatings((prevRatings) =>
      prevRatings.map((rating) =>
        rating.value === ratingValue
          ? { ...rating, isChecked: checked }
          : rating
      )
    );
  };

  const [locationQuery, setLocationQuery] = useState("");

  const updateFilters = () => {
    props.setFilterObj((prev) => ({
      ...prev,
      filters: {
        serviceTypes: serviceTypes.filter((service) => service.isChecked),
        priceRange: priceRange,
        ratings: ratings.filter((rating) => rating.isChecked),
        location: rc(locationQuery),
      },
    }));
  };

  const resetFilters = () => {
    setServiceTypes((prev) =>
      prev.map((service) => ({ name: service.name, isChecked: false }))
    );
    setRatings((prev) =>
      prev.map((rating) => ({ value: rating.value, isChecked: false }))
    );
    setLocationQuery("");

    props.setFilterObj((prev) => ({ ...prev, filters: null }));
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>
      <Accordion
        type="multiple"
        collapsible="true"
        defaultValue={["service-type", "price", "rating"]}
      >
        <AccordionItem value="service-type">
          <AccordionTrigger className="text-lg">Service Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {serviceTypes.map((service) => (
                <div key={service.name} className="flex items-center gap-2">
                  <Checkbox
                    id={`service-${service.name.toLowerCase}`}
                    checked={service.isChecked}
                    onCheckedChange={(checked) =>
                      updateServiceTypes(service.name, !!checked)
                    }
                  />
                  <Label htmlFor={`service-${service.name.toLowerCase}`}>
                    {service.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="price">
          <AccordionTrigger className="text-lg">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 10000]}
                min={0}
                max={10000}
                onValueChange={(value) => setPriceRange(value)}
              />
              <div className="flex justify-between">
                <span>&#8358;{priceRange[0]}</span>
                <span>&#8358;{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="rating">
          <AccordionTrigger className="text-lg">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating.value} className="flex gap-2">
                  <Checkbox
                    id={`rating-${rating.value}`}
                    checked={rating.isChecked}
                    onCheckedChange={(checked) =>
                      updateRatings(rating.value, !!checked)
                    }
                  />
                  <Label htmlFor={`rating-${rating.value}`}>
                    {rating.value} {rating.value > 1 ? "Stars" : "Star"} & Up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="text-lg">Location</AccordionTrigger>
          <AccordionContent>
            <Input
              type="text"
              className=""
              placeholder="Enter City or Region"
              value={locationQuery}
              onChange={(event) => setLocationQuery(event.target.value)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-2 mt-6">
        <Button
          variant="secondary"
          className="bg-primary-500"
          onClick={updateFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="secondary"
          className="bg-white border-1 text-black hover:bg-neutral-100"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

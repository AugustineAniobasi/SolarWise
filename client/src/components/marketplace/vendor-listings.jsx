import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, MapPin, ThumbsUp, MessageSquare } from "lucide-react";
import { buttonVariants, Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function VendorListings(props) {
  const [sortOption, setSortOption] = useState(null);

  const sortedVendors = [...props.vendors].sort((a, b) => {
    if (sortOption === null) {
      return 1;
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    } else if (sortOption === "reviews") {
      return b.reviewCount - a.reviewCount;
    } else if (sortOption === "response") {
      return b.responseRate - a.responseRate;
    }
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">
          {props.vendors.length} vendors found
        </h2>

        <div className="flex gap-2 items-center">
          <span htmlFor="rating" className="text-neutral-600">
            Sort by:
          </span>
          <Select onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="response">Response Rate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedVendors.map((vendor) => (
          <Card key={vendor.id} className="p-0">
            <CardContent className="p-0">
              <div className="flex">
                <div className="basis-1/4 flex items-center">
                  <div className="relative w-fit m-auto">
                    <img
                      src={vendor.image}
                      className="max-w-[100px] rounded-full"
                      alt={`${vendor.name} logo`}
                    />
                    {vendor.verified && (
                      <Badge className="absolute -bottom-1 -right-1 bg-success-700 rounded-xl">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="basis-2/4 p-4 space-y-1 border-x-2 border-primary-50">
                  <h3 className="font-semibold text-lg">{vendor.name}</h3>
                  <div className="flex gap-2 items-center">
                    <Star className="icon fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-neutral-900">
                      ({vendor.reviewCount}) reviews
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MapPin className="icon text-neutral-900" />
                    <span className="text-neutral-900">
                      {vendor.location.city}, {vendor.location.region}
                    </span>
                  </div>
                  <div className="space-x-2">
                    {vendor.services.map((service) => (
                      <Badge
                        key={service}
                        className="bg-white text-black border-1 border-black rounded-xl"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-neutral-900">{vendor.description}</div>
                </div>
                <div className="basis-1/4 bg-primary-50 p-4 space-y-1">
                  <div>
                    <div className="text-neutral-900">Response Rate</div>
                    <div className="flex gap-2 items-center">
                      <ThumbsUp className="icon text-success-700" />
                      <span className="font-semibold">
                        {vendor.responseRate}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-900">Response Time</div>
                    <div className="flex gap-2 items-center">
                      <MessageSquare className="icon text-primary-500" />
                      <span className="font-semibold">
                        {vendor.responseTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      className={`bg-primary-500`}
                      disabled="true"
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="secondary"
                      disabled="true"
                      className={`${cn(
                        `text-black bg-white hover:bg-neutral-100`
                      )}`}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

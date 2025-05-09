import { Link } from "react-router-dom";
import { buttonVariants, Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function SolarNeedSection() {
  return (
    <section className="p-4 grid grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className="inline-block bg-success-50 text-success-700 py-0.5 px-2 rounded-sm align-middle font-semibold">
            Solar Assessment
          </span>
        </div>
        <h2 className="text-5xl font-bold">Discover Your Solar Needs</h2>
        <p className="text-neutral-900 text-xl">
          Our advanced assessment tool analyzes your location, energy usage, and
          property details to provide personalized solar recommendations. Get
          started in just a few minutes.
        </p>
        <div className="flex gap-2">
          <Link
            to="assessment"
            className={`${buttonVariants({
              variant: "secondary",
            })} bg-success-700 hover:bg-success-800`}
          >
            Start Assessment
            <ArrowRight className="aspect-square w-6" />
          </Link>
          <Button to="learn-more" variant="outline" disabled="true">
            Learn More
          </Button>
        </div>
      </div>
      <div className="grid place-items-center">
        <div className="grid max-w-[350px] grid-cols-2 gap-2">
          <div className="bg-success-50 p-3 rounded-lg text-success-700">
            <div className="font-bold text-xl">30%</div>
            <div className="text-sm">Average Energy Savings</div>
          </div>
          <div className="bg-amber-100 rounded-lg text-amber-600 p-3">
            <div className="font-bold text-xl">26%</div>
            <div className="text-sm">Federal Tax Credit</div>
          </div>
          <div className="bg-blue-100 rounded-lg text-blue-600 p-3">
            <div className="font-bold text-xl">15 Years</div>
            <div className="text-sm">Average ROI Period</div>
          </div>
          <div className="bg-purple-100 rounded-lg text-purple-600 p-3">
            <div className="font-bold text-xl">5-7</div>
            <div className="text-sm">Days for Installation</div>
          </div>
        </div>
      </div>
    </section>
  );
}

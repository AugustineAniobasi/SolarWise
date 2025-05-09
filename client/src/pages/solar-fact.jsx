import { useLoaderData, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import data from "../../db.json";

import { SolarFactDetail } from "@components/solar-fact/solar-fact-detail";

function SolarFact() {
  var { facts } = useLoaderData();
  facts = facts || data["facts-content"];
  const { factId } = useParams();

  const fact = facts.find((fact) => fact.id === factId);
  const othersFacts = facts.filter((fact) => fact.id !== factId);

  return (
    <main className="wrapper bg-primary-50">
      <div className="my-6">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="icon text-primary-500" />
          <span className="text-primary-500">Back to Home</span>
        </Link>
      </div>
      <SolarFactDetail fact={fact} of={othersFacts} />
    </main>
  );
}

export default SolarFact;

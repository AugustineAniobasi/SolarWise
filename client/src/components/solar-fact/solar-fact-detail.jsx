import { ExploreMore } from "./explore-more-facts";
console.log();

export function SolarFactDetail(props) {
  return (
    <section>
      <div className="rounded-xl overflow-hidden bg-white mb-8 shadow-md">
        <header
          className={`full-bleed wrapper bg-[url('/src/assets/images/solar-facts/solar-fact.jpg')] bg-no-repeat bg-cover bg-center relative`}
        >
          <div className="full-bleed absolute bg-[linear-gradient(1deg,rgba(10,_10,_10,_0.8)_0%,_rgba(255,_255,_255,_0)_90%)] w-full h-full top-0 left-0"></div>
          <div className="relative z-10 p-8">
            <h1 className="mt-[200px] text-4xl max-w-2xl font-bold text-white">
              {props.fact.title}
            </h1>
          </div>
        </header>
        <div className="p-8">
          <div className="my-8 space-y-8">
            {props.fact.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
          <ExploreMore moreFacts={props.of} />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export function AboutIntro() {
  return (
    <section className="flex flex-col justify-center bg-white px-6 pt-16 pb-24 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-brand uppercase">Who We Are</p>

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase sm:text-4xl">
              One University, One Team
            </h2>
            <p className="mt-4 text-base text-black/60">
              In August 2024, City, University of London merged with St George&apos;s, University
              of London to form City St George&apos;s, University of London, bringing together two
              well-established institutions under one name. Our team took on a new identity
              alongside it: from City Racing to CSG Racing, carrying forward everything the team
              built before while representing the newly combined university at Formula Student.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/about/who-we-are.jpg"
              alt="The full CSG Racing team at Silverstone"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

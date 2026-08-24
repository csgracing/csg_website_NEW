import Image from "next/image";

export function CarShowcase({ carName }: { carName: string }) {
  return (
    <section className="bg-background px-6 pt-12 pb-6 text-center sm:pt-14 sm:pb-10">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-black tracking-tight uppercase sm:text-4xl">{carName}</h2>

        <div className="relative mx-auto mt-6 aspect-video w-full overflow-hidden">
          <Image
            src="/images/cars/greta-showcase.jpg"
            alt="GRETA, the CSG Racing car, at Silverstone"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

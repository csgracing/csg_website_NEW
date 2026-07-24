import { getSiteConfig } from "@/lib/data";

export default function Home() {
  const site = getSiteConfig();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">{site.name}</h1>
      <p className="mt-4 max-w-md">{site.description}</p>
    </div>
  );
}

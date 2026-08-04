export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
}

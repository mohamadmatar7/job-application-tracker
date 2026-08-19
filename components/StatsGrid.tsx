type Stat = {
  label: string;
  value: number;
};

type Props = {
  items: Stat[];
};

export default function StatsGrid({ items }: Props) {
  return (
    <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="
            rounded-2xl
            border border-slate-200
            bg-white p-5
            shadow-sm
            transition
            hover:border-slate-300
            hover:shadow-md
          "
        >
          <p className="text-sm font-medium text-slate-500">
            {item.label}
          </p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold tracking-tight text-slate-950">
              {item.value}
            </p>

          </div>
        </article>
      ))}
    </section>
  );
}
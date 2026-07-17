export default function AdminLoading() {
  return <div className="animate-pulse space-y-6"><div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-36 rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div><div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" /></div>;
}

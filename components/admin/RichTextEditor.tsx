"use client";

import { useRef } from "react";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";

const commands = [
  { command: "bold", label: "Kalın", icon: Bold },
  { command: "italic", label: "İtalik", icon: Italic },
  { command: "underline", label: "Altı çizili", icon: Underline },
  { command: "insertUnorderedList", label: "Madde listesi", icon: List },
  { command: "insertOrderedList", label: "Numaralı liste", icon: ListOrdered },
];

export function RichTextEditor({ initialValue, onChange }: { initialValue: string; onChange: (value: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const execute = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML ?? "");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex gap-1 border-b border-slate-200 p-2 dark:border-slate-700">{commands.map(({ command, label, icon: Icon }) => <button key={command} type="button" title={label} onClick={() => execute(command)} className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Icon size={16} /></button>)}</div>
      <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={(event) => onChange(event.currentTarget.innerHTML)} dangerouslySetInnerHTML={{ __html: initialValue }} className="min-h-44 px-4 py-3 text-sm leading-7 outline-none [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5" />
    </div>
  );
}

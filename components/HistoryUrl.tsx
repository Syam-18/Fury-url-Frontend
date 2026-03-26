"use client";

import { Copy, Check, Trash2, Calendar, MouseLeft } from "lucide-react";
import { useState } from "react";

type Props = {
  original: string;
  short: string;
  createdAt: string;
  onDelete: () => void;
  clicks: number
};



export default function HistoryUrl({
  original,
  short,
  createdAt,
  onDelete,
  clicks,
}: Props) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(short);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="flex justify-between items-center bg-[#11111a] hover:bg-[#161622] p-3 md:px-5 md:py-4 border border-[#2a2a3a] hover:border-[hsl(271,49%,65%)] rounded transition"
    >
      {/* URL INFO */}
      <div className="flex flex-col">
        <a
          className="font-semidbold text-[#c7d2fe] text-md md:text-lg hover:underline cursor-pointer"
          href={`https://furyurl.onrender.com/${short}`}
          target="_blank"
        >
          furyurl.onrender.com/{short}
        </a>
        <div className="w-[50vw] md:w-[45vw] lg:w-[45vw] xl:w-[35vw] overflow-x-auto scrollbar-hide">
          <a
            className="text-[#6b7280] md:text-md text-sm hover:underline truncate cursor-pointer"
            title={original}
            href={original}
          >
            {original}
          </a>
        </div>
        <div className="flex gap-4 mt-2 md:mt-3 font-medium text-[#6b7280] text-[10px] md:text-[12px]">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="flex items-center gap-1">
            <MouseLeft size={12} />
            {"No of clicks " + clicks}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* COPY */}
        <button
          onClick={copy}
          className="text-[#22d3ee] hover:text-[#f472b6] transition cursor-pointer"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>

        {/* DELETE */}
        <button
          onClick={onDelete}
          className="text-[#6b7280] hover:text-red-500 transition cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

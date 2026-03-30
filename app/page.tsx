"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Copy, History, Link2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import HistoryUrl from "@/components/HistoryUrl";
import { HistoryItem } from "./history/page";
import { BarLoader, CircleLoader } from "react-spinners";
import NavigationBar from "@/components/NavigationBar";
import { deleteUrl, getMyUrls, shortenUrl } from "@/lib/urlApi";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const router = useRouter();
  const [copiedMain, setCopiedMain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShortUrlLoading, setIsShortUrlLoading] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const getUrl = async () => {
      const urls = await getMyUrls();
      setHistory(urls);
      setIsLoading(false);
    };
    getUrl();
  }, []);

  const copyMain = () => {
    if (shortUrl) navigator.clipboard.writeText(`furyurl.onrender.com/short`);
    else return;
    setCopiedMain(true);

    setTimeout(() => {
      setCopiedMain(false);
    }, 2000);
  };

  const handleShorten = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) return;
    setIsShortUrlLoading(true);
    if (!url) return;

    try {
      const data = await shortenUrl(url);
      setIsShortUrlLoading(false);
      setShortUrl(data.shortUrl);
    } catch (err) {
      setIsShortUrlLoading(false);
      setShortUrl("Try Again");
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setHistory((prev) => prev.filter((url) => url._id !== id));
      await deleteUrl(id);
      console.log("Deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white flex justify-center px-6 pt-20 pb-10 relative">
      <NavigationBar />

      <div className="w-full max-w-2xl">
        {/* TITLE */}
        <div className="text-center mb-6 md:mb-14 ">
          <h1 className="text-2xl md:text-4xl font-extrabold bg-linear-to-r from-[#22d3ee] via-[#a855f7] to-[#f472b6] bg-clip-text text-transparent">
            furyurl
          </h1>

          <p className="text-[#6b7280] text-sm md:text-3 md:mt-3">Fast • Minimal • URL Shortener</p>
        </div>

        {/* INPUT CARD */}
        <form
          onSubmit={handleShorten}
          className="bg-[#11111a] border border-[#2a2a3a] rounded-md p-2 md:p-4 md:px-3 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
        >
          <div className="flex gap-1 md:gap-3">
            <div className="flex items-center px-1 md:px-3 text-[#22d3ee] md:flex">
              <Link2 size={16} />
            </div>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your URL"
              className="flex-1 text-sm md:text-lg bg-transparent outline-none placeholder-[#6b7280]"
            />

            <button
              className="
              px-2 py-1
            md:px-4 md:py-2 rounded-md
            bg-linear-to-r from-[#22d3ee] to-[#a855f7]
            transition
            flex items-center gap-2
            shadow-[0_0_15px_rgba(168,85,247,0.4)]
            cursor-pointer
          "
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {/* SHORTENED URL */}
        <div className="mt-6 md:mt-10">
          <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-2 md:mb-3">
            Shortened URL
          </p>

          <div
            className={`
          flex items-center justify-between
          bg-[#11111a]
          border border-[#2a2a3a]
          rounded-md
          p-3 py-2 md:p-4
          hover:border-[#22d3ee]
          transition
          ${!shortUrl ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={copyMain}
          >
            {isShortUrlLoading ? (
              <div className="flex justify-center">
                <BarLoader color="#22d3ee" />
              </div>
            ) : (
              <span className="text-[#c7d2fe] text-sm md:text-[16px]">
                {shortUrl ? shortUrl : "Shorten any url to copy"}
              </span>
            )}

            <button className="text-[#22d3ee] hover:text-[#f472b6] transition">
              {copiedMain ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* HISTORY */}
        <div className="mt-6 md:mt-12">
          <div className="flex items-center gap-2 mb-3 md:mb-5">
            <p className="text-xs uppercase tracking-widest text-[#6b7280]">
              History
            </p>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-6">
                <CircleLoader size={25} color="#22d3ee" />
              </div>
            ) : history.length === 0 ? (
              <p className="text-[#6b7280] text-sm">No URLs yet</p>
            ) : (
              history
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item) => (
                  <HistoryUrl
                    key={item.shortCode}
                    original={item.originalUrl}
                    short={item.shortCode}
                    createdAt={item.createdAt}
                    onDelete={() => deleteItem(item._id)}
                    clicks={item.visitHistory?.length || 0}
                  />
                ))
            )}
          </div>
        </div>

        {/* FULL HISTORY */}
        <div
          className={`flex justify-center mt-12 ${history.length <= 5 && "hidden"}`}
        >
          <button
            onClick={() => router.push("/history")}
            className="flex items-center gap-2 text-[#c7d2fe] hover:text-[#22d3ee] transition cursor-pointer"
          >
            <History size={18} />
            Full History
          </button>
        </div>
      </div>
    </div>
  );
}

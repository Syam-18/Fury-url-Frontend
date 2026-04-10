"use client";

import { useEffect, useState } from "react";
import HistoryUrl from "@/components/HistoryUrl";
import { CircleLoader } from "react-spinners";
import NavigationBar from "@/components/NavigationBar";
import { deleteUrl, getMyUrls } from "@/lib/urlApi";

export type HistoryItem = {
    _id: string;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    visitHistory: string;
};

export type HistoryResponse = {
  data: HistoryItem[];
  currentPage: number,
  totalPages: number
  totalUrls: number
};

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [history, setHistory] = useState<HistoryItem[]>();

  useEffect(() => {
    const getUrl = async () => {
      const urls = await getMyUrls(currentPage);
      setHistory(urls.data);
      setPages(urls.totalPages)
      setIsLoading(false)
    };
    getUrl();
  }, [currentPage]);

  const deleteItem = async(id: string) => {
      try {
        setHistory((prev) => prev?.filter((url) => url._id !== id));
        await deleteUrl(id);
        console.log("Deleted successfully");
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <div className="relative flex justify-center bg-[#0b0b12] px-6 pt-20 pb-10 min-h-screen text-white">
      <NavigationBar />

      <div className="w-full max-w-2xl">
        {/* TITLE */}
        <div className="mb-14 text-center">
          <h1 className="bg-clip-text bg-linear-to-r from-[#22d3ee] via-[#a855f7] to-[#f472b6] font-extrabold text-transparent text-2xl md:text-4xl">
            URL History
          </h1>

          <p className="mt-2 md:mt-3 text-[#6b7280]">
            Previously shortened links
          </p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <CircleLoader size={25} color="#22d3ee" />
            </div>
          ) : history?.length === 0 ? (
            <p className="text-[#6b7280] text-sm">No URLs yet</p>
          ) : (
            history
              ?.slice()
              .reverse()
              .map((item) => (
                <HistoryUrl
                  key={item.shortCode}
                  original={item.originalUrl}
                  short={item.shortCode}
                  createdAt={item.createdAt}
                  clicks={item.visitHistory?.length || 0}
                  onDelete={() => deleteItem(item._id)}
                />
              ))
          )}
        </div>
        <div className="flex justify-center items-center mt-4 gap-2">
          <p className="mr-4 text-lg">Pages</p>
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={` p-1 rounded w-6 h-6 flex items-center justify-center cursor-pointer ${
                currentPage === i + 1
                ? "bg-gray-100 text-black"
                : "bg-[hsl(0,0%,10%)] text-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true)

  const [history, setHistory] = useState<HistoryItem[]>();

  useEffect(() => {
    const getUrl = async () => {
      const urls = await getMyUrls();
      setHistory(urls);
      setIsLoading(false)
    };
    getUrl();
  }, []);

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
    <div className="min-h-screen bg-[#0b0b12] text-white flex justify-center px-6 pt-20 pb-10 relative">
      <NavigationBar />

      <div className="w-full max-w-2xl">
        {/* TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-[#22d3ee] via-[#a855f7] to-[#f472b6] bg-clip-text text-transparent">
            URL History
          </h1>

          <p className="text-[#6b7280] mt-3">Previously shortened links</p>
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
      </div>
    </div>
  );
}

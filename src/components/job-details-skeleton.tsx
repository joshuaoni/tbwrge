import Link from "next/link";

export const JobDetailsSkeleton = () => (
  <div className="max-w-[1000px] w-full mx-auto px-4 py-8 animate-pulse">
    <div className="w-24 h-8 bg-gray-100 rounded mb-4 md:mb-6" />

    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
        <div className="flex-grow">
          <div className="w-full md:w-2/3 h-6 md:h-7 bg-gray-100 rounded mb-3 md:mb-4" />
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="w-24 md:w-32 h-4 md:h-5 bg-gray-100 rounded" />
            <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
            <div className="w-20 md:w-24 h-4 md:h-5 bg-gray-100 rounded" />
            <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
            <div className="w-16 md:w-20 h-4 md:h-5 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4">
          <div className="w-20 h-4 bg-gray-100 rounded mb-1" />
          <div className="w-32 h-5 bg-gray-100 rounded" />
        </div>
      ))}
    </div>

    <div className="space-y-6 md:space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-8">
          <div className="w-32 h-5 bg-gray-100 rounded mb-4" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-100 rounded" />
            <div className="w-3/4 h-4 bg-gray-100 rounded" />
            <div className="w-1/2 h-4 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

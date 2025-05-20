const Blogs = () => {
  return (
    <div
      className="relative h-fit pt-24 md:pt-[74px] flex items-center justify-center p-4 py-12 md:py-0 md:p-12 md:px-16 bg-black"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div className="w-full relative z-10">
        {/* Navigation Arrows and Frame Number */}
        <div className="absolute top-8 right-12 flex items-center space-x-4 z-10">
          <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
            {/* Left Arrow SVG */}
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 4l-4 4 4 4" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
            {/* Right Arrow SVG */}
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-full text-2xl md:text-3xl capitalize font-bold text-white mb-8">
            Blogs
          </h2>
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-8"></div>

          {/* View All Jobs Button */}
          <div className="my-12">
            <button className="px-6 py-4 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition">
              View All Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

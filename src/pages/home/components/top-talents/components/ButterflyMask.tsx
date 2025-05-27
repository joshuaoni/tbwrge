import React from "react";

interface ButterflyMaskedImageProps {
  imageUrl: string;
}

const ButterflyMaskedImage: React.FC<ButterflyMaskedImageProps> = ({
  imageUrl,
}) => {
  return (
    <svg
      viewBox="0 0 180 170"
      width="180"
      height="170"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define clipPath based on actual butterfly shape */}
      <defs>
        <clipPath id="butterflyClip">
          <path d="M38.1 0C14.7 0 0 24.7 0 47.4c0 16.3 9.8 26.3 18.7 34.4-8.9 8.1-18.7 18.1-18.7 34.4C0 139 14.7 164 38.1 164c9.9 0 16.8-4.3 21.7-9.2 3.9-3.9 7.4-8.6 10.4-12.5l.2-.3.2.3c3 3.9 6.5 8.6 10.4 12.5 4.9 4.9 11.8 9.2 21.7 9.2 23.4 0 38.1-25 38.1-47.8 0-16.3-9.8-26.3-18.7-34.4 8.9-8.1 18.7-18.1 18.7-34.4C141.9 24.7 127.2 0 103.8 0c-9.9 0-16.8 4.3-21.7 9.2-3.9 3.9-7.4 8.6-10.4 12.5l-.2.3-.2-.3c-3-3.9-6.5-8.6-10.4-12.5C54.9 4.3 48 0 38.1 0Z" />
        </clipPath>
      </defs>

      {/* Black shadow behind */}
      <g transform="translate(5,5)">
        <path
          d="M38.1 0C14.7 0 0 24.7 0 47.4c0 16.3 9.8 26.3 18.7 34.4-8.9 8.1-18.7 18.1-18.7 34.4C0 139 14.7 164 38.1 164c9.9 0 16.8-4.3 21.7-9.2 3.9-3.9 7.4-8.6 10.4-12.5l.2-.3.2.3c3 3.9 6.5 8.6 10.4 12.5 4.9 4.9 11.8 9.2 21.7 9.2 23.4 0 38.1-25 38.1-47.8 0-16.3-9.8-26.3-18.7-34.4 8.9-8.1 18.7-18.1 18.7-34.4C141.9 24.7 127.2 0 103.8 0c-9.9 0-16.8 4.3-21.7 9.2-3.9 3.9-7.4 8.6-10.4 12.5l-.2.3-.2-.3c-3-3.9-6.5-8.6-10.4-12.5C54.9 4.3 48 0 38.1 0Z"
          fill="#000"
        />
      </g>

      {/* Main masked content */}
      <g clipPath="url(#butterflyClip)">
        {/* Background image */}
        <image
          href={imageUrl}
          width="180"
          height="170"
          preserveAspectRatio="xMidYMid slice"
        />
        {/* Green overlay */}
        <rect width="180" height="170" fill="green" opacity="0.6" />
      </g>
    </svg>
  );
};

export default ButterflyMaskedImage;

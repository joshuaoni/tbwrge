import AirBnB from "../../../../public/images/airbnb.png";
import Microsoft from "../../../../public/images/microsoft.png";
import Google from "../../../../public/images/google.png";
import Amazon from "../../../../public/images/amazon.png";
import FedEx from "../../../../public/images/fedex.png";
import hubspot from "../../../../public/images/hubspot.png";
import Image from "next/image";
export const Partners = () => {
  let partners = [
    {
      image: AirBnB,
      alt: "airbnb",
    },
    {
      image: Google,
      alt: "google",
    },
    {
      image: Amazon,
      alt: "amazon",
    },
    {
      image: Microsoft,
      alt: "microsoft",
    },
    {
      image: FedEx,
      alt: "fedex",
    },
    {
      image: hubspot,
      alt: "hubspot",
    },
  ];
  return (
    <div className="flex items-center justify-evenly py-8 border-b">
      {partners.map((partner, index) => (
        <div className="flex flex-col items-center justify-center" key={index}>
          <Image src={partner.image} alt={partner.alt} width={70} height={70} />
        </div>
      ))}
    </div>
  );
};

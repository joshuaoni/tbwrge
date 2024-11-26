import { useRouter } from "next/router";
import React, { useState } from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [jobDetails, setJobDetails] = useState(null);
  return <div className="h-screen w-screen bg-red-400 "></div>;
};

export default index;

import { JobPostGeneratorResponse } from "@/interfaces/job-tools-generator.interface";

function JobPost(props: JobPostGeneratorResponse) {
  return (
    <div className="text-xs p-2 max-w-4xl">
      <h1 className="font-bold text-gray-800">
        {props.job_title || "Job Title"}
      </h1>
      <p className="text-gray-700">
        <span className="font-medium">Job Title:</span>&nbsp;
        {props.job_title || "Not specified"}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Location:</span>{" "}
        {props.location || "Not specified"}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Company:</span>{" "}
        {props.company || "Not specified"}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Employment Type:</span>{" "}
        {props.employment_type || "Not specified"}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Experience Level:</span>{" "}
        {props.experience || "Not specified"}
      </p>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">About Us</h2>
        <p className="text-gray-700">{props.about_us || "Not specified"}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">Key Responsibilities</h2>
        {props.responsibilities && props.responsibilities.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {props.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">Not specified</p>
        )}
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">Requirements</h2>
        {props.requirements && props.requirements.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {props.requirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">Not specified</p>
        )}
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">What We Offer</h2>
        {props.what_we_offer && props.what_we_offer.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {props.what_we_offer.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">Not specified</p>
        )}
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">How to Apply</h2>
        <p className="text-gray-700">{props.how_to_apply || "Not specified"}</p>
      </section>
    </div>
  );
}

export default JobPost;

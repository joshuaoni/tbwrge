import { JobPostGeneratorResponse } from "@/interfaces/job-tools-generator.interface";

function JobPost(props: JobPostGeneratorResponse) {
  return (
    <div className="text-xs p-2 max-w-4xl mx-auto">
      <h1 className="font-bold text-gray-800">{props.job_title}</h1>
      <p className="text-gray-700">
        <span className="font-medium">Job Title:</span>&nbsp;{props.job_title}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Location:</span> {props.job_location_name}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Company:</span> {props.company_name}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Employment Type:</span> {props.job_type}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Experience Level:</span>{" "}
        {props.years_of_experience_required}
      </p>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">About Us</h2>
        <p className="text-gray-700">{props.company_description}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">Key Responsibilities</h2>
        <p className="text-gray-700">{props.job_description}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">Requirements</h2>{" "}
        <ul className="list-disc list-inside text-gray-700">
          {props?.required_skills?.split(",").map((item, i) => (
            <li key={i}>
              {item.trim().charAt(0).toUpperCase() + item.trim().slice(1)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700">
          {props?.additional_benefits?.split(",").map((item, i) => (
            <li key={i}>
              {item.trim().charAt(0).toUpperCase() + item.trim().slice(1)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="font-bold text-gray-800">How to Apply</h2>
        <p className="text-gray-700">
          If you're passionate about front-end development and ready to make an
          impact, we'd love to hear from you!
        </p>
        <p className="text-gray-700">
          Please send your resume, portfolio (or GitHub link), and a short cover
          letter to: <span className="font-medium">{props.user.email}</span>.
        </p>
      </section>
    </div>
  );
}

export default JobPost;

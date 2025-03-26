import { useContext, useState } from "react";

import EditIcon from "@/components/icons/edit";
import PlusCircleIcon from "@/components/icons/plus-circle";
import TrashIcon from "@/components/icons/trash";
import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft, CheckIcon } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

function CreateJobScreening() {
  const [questions, setQuestions] = useState<
    { title: string; answer: string }[]
  >([
    {
      title:
        "Could you describe a project or task you’ve worked on that best demonstrates your skills for this role?",
      answer: "",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [wordCount, setWordCount] = useState(0);
  const limit = 500;

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = e.target.value;
    setQuestions(newQuestions);
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
    setNewQuestion(questions[index].title);
  };

  const handleSaveEdit = (index: number) => {
    if (!newQuestion) return toast.error("Question cannot be empty");

    const updatedQuestions = [...questions];
    updatedQuestions[index].title = newQuestion;
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setNewQuestion("");
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const ctx = useContext(CreateJobContext);

  return (
    <div className="">
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.prevScreen()} className="mr-4">
          <ArrowLeft />
        </button>{" "}
        {ctx.formData.job_title} Screen Questions
      </h3>
      <div className="flex gap-20">
        <section className="w-full">
          <div className="flex justify-between items-center my-6">
            <span>{ctx.formData.company_name}</span>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-100">
              <Image
                src={
                  ctx.formData.company_logo
                    ? URL.createObjectURL(ctx.formData.company_logo)
                    : "/placeholder-logo.png"
                }
                alt="company logo"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <p>{ctx.formData.company_description}</p>
            <p>{ctx.formData.company_website}</p>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold mt-6">Job Information</h4>
          </div>

          {[
            { title: "Job Title", value: ctx.formData.job_title },
            {
              title: "Job Description & Responsibilities",
              value: ctx.formData.job_description,
            },
            {
              title: "Required Skills",
              value: ctx.formData.required_skills
                .split(",")
                .filter(Boolean)
                .map((skill) => skill.trim()),
            },
            {
              title: "Experience",
              value: `Minimum ${ctx.formData.years_of_experience_required} years of professional software development experience`,
            },
            { title: "Job Type", value: ctx.formData.job_type },
            { title: "Location", value: ctx.formData.job_location },
            {
              title: "Salary Range",
              value: `€${ctx.formData.salary_range_min} - €${ctx.formData.salary_range_max} USD per year`,
            },
            {
              title: "Benefits",
              value: ctx.formData.additional_benefits,
            },
            { title: "Job ID", value: "JOB12345" },
            { title: "Job Expiry", value: ctx.formData.end_date || "Not set" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start gap-10 my-6"
            >
              <span className="font-semibold w-1/3">{item.title}</span>
              {Array.isArray(item.value) ? (
                <ul className="list-disc w-full">
                  {item.value.map((val, index) => (
                    <li key={index}>{val}</li>
                  ))}
                </ul>
              ) : (
                <span className="w-full">{item.value}</span>
              )}
            </div>
          ))}
        </section>
        <section className="w-11/12 px-4 h-fit pb-8 shadow-lg">
          <p className="text-sm text-[#898989]">
            Thank you for taking the time to apply for the&nbsp;
            {ctx.formData.job_title} position at&nbsp;
            {ctx.formData.company_name} and for sharing your qualifications and
            experiences with us.
            <br />
            As the next step in our hiring process, we’d love to invite you to
            screening process to get to know you better.
          </p>

          {questions.map((question, i) => (
            <div key={i} className="my-6">
              <div className="flex justify-end gap-2">
                {editingIndex === i ? (
                  <button
                    onClick={() => handleSaveEdit(i)}
                    className="text-green-600"
                  >
                    <CheckIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditQuestion(i)}
                    className="text-blue-600"
                  >
                    <EditIcon />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteQuestion(i)}
                  className="text-red-600"
                >
                  <TrashIcon />
                </button>
              </div>

              <div className="w-full space-y-2 relative">
                {editingIndex === i ? (
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <label className="block text-gray-700 text-sm font-medium">
                    {question.title}
                  </label>
                )}
                <textarea
                  rows={5}
                  className="bg-gray-100 py-4 px-6 rounded w-full focus:outline-none"
                  placeholder="Type your answer here"
                  value={question.answer}
                  onChange={(e) => handleTextareaChange(e, i)}
                />
                <span className="absolute top-8 right-6 text-xs font-medium text-gray-500">
                  {wordCount} / {limit}
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setQuestions([
                ...questions,
                {
                  title: "Enter your question here",
                  answer: "",
                },
              ]);
              setEditingIndex(questions.length);
            }}
            className="flex items-center gap-2 mt-6 px-4"
          >
            <PlusCircleIcon />
            <span className="capitalize font-bold">Add custom question</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default CreateJobScreening;

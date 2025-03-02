import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CheckIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { createJob, CreateJobResponse } from "@/actions/create-job";
import EditIcon from "@/components/icons/edit";
import PlusCircleIcon from "@/components/icons/plus-circle";
import TrashIcon from "@/components/icons/trash";
import { useUserStore } from "@/hooks/use-user-store";
import { CreateJobContext } from "@/providers/job-posting.context";
import {
  DashboardFileGroup,
  DashboardInputGroup,
  DashboardSelectGroup,
  DashboardTextareaGroup,
} from "../input-group";

function CreateJobOverview() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = e.target.value;
    setQuestions(newQuestions);
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

  const { userData } = useUserStore();

  const createJobMutation = useMutation<CreateJobResponse>({
    mutationFn: async () =>
      await createJob(userData?.token ?? "", ctx.formData), // FIXME: update formData
    onSuccess: () => {
      toast.success("Job post created successfully");
    },
  });

  return (
    <div className="">
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.goTo("hiring")} className="mr-4">
          <ArrowLeft />
        </button>
        <span>Create Job Post</span>
      </h3>
      <div className="flex gap-20">
        <section className="w-full">
          <div className="flex justify-between items-center my-6">
            <span>Example Tech Solution</span>
            <span className="w-16 h-16 bg-gray-300 rounded-full"></span>
          </div>
          <div className="flex justify-between items-center gap-10">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              atque laboriosam vero labore ullam expedita dolorem distinctio
              debitis nesciunt tenetur.
            </p>
            <p>www.babs.com</p>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold mt-6">Job Information</h4>
          </div>

          {[
            { title: "Job Title", value: ctx.formData.job_title },
            {
              title: "Job Description",
              value: ctx.formData.job_description,
            },
            {
              title: "Key Responsibilities",
              value: [
                "Develop, test, and maintain software applications and systems.",
                "Write clean, scalable, and efficient code following best practices and industry standards.",
                "Participate in code reviews to maintain high code quality.",
                "Troubleshoot and resolve bugs and issues across production systems.",
                "Stay up-to-date with the latest trends in software development.",
              ],
            },
            {
              title: "Required Skills",
              value: [
                "JavaScript",
                "TypeScript",
                "Python",
                "C++",
                "Node.js",
                "React",
                "AWS",
                "Docker",
              ],
            },
            {
              title: "Experience",
              value:
                "Minimum 3+ years of professional software development experience",
            },
            { title: "Job Type", value: "Full Time" },
            { title: "Location", value: "Remote (Flexible Working Hours)" },
            { title: "Salary Range", value: "€60,000 - €90,000 USD per year" },
            {
              title: "Benefits",
              value: [
                "Health and dental insurance",
                "401(k) matching",
                "PTO",
                "Professional development opportunities",
              ],
            },
            { title: "Job ID", value: "JOB12345" },
            { title: "Job Expiry", value: "December 31, 2024" },
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
        <section className="w-11/12 px-4 h-fit pb-8">
          <h4 className="text-lg font-semibold mb-4">Job Application</h4>

          <form className="space-y-4">
            <DashboardInputGroup label="Full Name" />
            <DashboardInputGroup label="Email" />
            <DashboardInputGroup label="Phone Number" />
            <DashboardInputGroup
              label="Date of Birth"
              placeholder="mm-dd-yyyy"
            />
            <DashboardInputGroup label="Linked Profile Link (optional)" />
            <DashboardInputGroup label="Current Company" />
            <DashboardInputGroup label="Current Position" />
            <DashboardSelectGroup
              title="Nationality"
              defaultValue="Select Nationality"
              options={[{ label: "Nigeria", value: "nig" }]}
              onChange={function (val: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DashboardSelectGroup
              title="Country of Residence"
              defaultValue="Number of years of Experience"
              options={[{ label: "Nigeria", value: "nig" }]}
              onChange={function (val: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DashboardTextareaGroup
              label="Relevant Experience Summary (Max 200 words)"
              placeholder="Describe our your past roles"
            />
            <DashboardTextareaGroup
              label="Relevant Skills Summary (Max 100 words)"
              placeholder="Highlight your key skills"
            />
            <DashboardFileGroup label="Upload CV" />
            <DashboardFileGroup label="Upload Cover Letter(Optional)" />
            <DashboardFileGroup label="Upload Application Voice note(Optional)" />
          </form>

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
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full rounded text-sm bg-gray-50 focus:outline-none"
                  />
                ) : (
                  <label
                    onClick={() => handleEditQuestion(i)}
                    className="block text-gray-700 text-sm font-medium"
                  >
                    {question.title}
                  </label>
                )}
                <input
                  placeholder="Type your answer here"
                  value={question.answer}
                  onChange={(e) => handleInputChange(e, i)}
                  className="w-full bg-gray-100 p-2 border rounded focus:outline-none"
                />
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
      <div className="w-full py-6 flex items-center justify-center">
        <button
          onClick={() => ctx.goTo("overview")}
          className="bg-[#009379] text-white px-8 py-2 rounded-lg"
        >
          Publish & View Job Post
        </button>
      </div>
    </div>
  );
}

export default CreateJobOverview;

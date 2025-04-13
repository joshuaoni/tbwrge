import { useContext, useState, useEffect } from "react";

import EditIcon from "@/components/icons/edit";
import PlusCircleIcon from "@/components/icons/plus-circle";
import TrashIcon from "@/components/icons/trash";
import { CreateJobContext } from "@/providers/job-posting.context";
import { ArrowLeft, CheckIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { outfit } from "@/constants/app";
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

function CreateJobScreening() {
  const ctx = useContext(CreateJobContext);
  const [isLoading, setIsLoading] = useState(true);

  const [questions, setQuestions] = useState<
    { title: string; answer: string }[]
  >([]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [wordCount, setWordCount] = useState(0);
  const limit = 500;

  // Initialize questions from context when component mounts
  useEffect(() => {
    setIsLoading(true);

    if (
      ctx.formData.screening_questions &&
      ctx.formData.screening_questions.length > 0
    ) {
      // Map the string array to the required format
      const formattedQuestions = ctx.formData.screening_questions.map((q) => ({
        title: q,
        answer: "",
      }));
      setQuestions(formattedQuestions);
    } else {
      // Use default question if no questions are available
      setQuestions([
        {
          title:
            "Could you describe a project or task you've worked on that best demonstrates your skills for this role?",
          answer: "",
        },
      ]);
    }

    setIsLoading(false);
  }, [ctx.formData.screening_questions]);

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

  const handleSaveScreeningQuestions = () => {
    // Filter out empty questions and only take the titles
    const questionTitles = questions
      .filter((q) => q.title.trim() !== "")
      .map((q) => q.title);

    if (questionTitles.length === 0) {
      return toast.error("Please add at least one question");
    }

    // Update the context with the questions
    ctx.setFormData("screening_questions", questionTitles);
    toast.success("Screening questions saved successfully");

    // Navigate back to hiring flow page after 500ms
    setTimeout(() => {
      ctx.goTo("hiring");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#009379]" />
      </div>
    );
  }

  return (
    <div className={`${outfit.className}`}>
      <h3 className="text-3xl font-semibold py-4">
        <button onClick={() => ctx.goTo("hiring")} className="mr-4">
          <ArrowLeft />
        </button>
        <span>Job Screening</span>
      </h3>
      <div className="flex gap-8">
        <section className="w-full">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {ctx.formData.company_logo ? (
                  <Image
                    src={URL.createObjectURL(ctx.formData.company_logo)}
                    alt={ctx.formData.company_name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {ctx.formData.company_name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-2">
                  {ctx.formData.job_title}
                </h1>
                <div className="flex flex-col gap-1">
                  <div className="text-[15px] text-gray-600">
                    {ctx.formData.company_name}
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <span>{ctx.formData.job_location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Job Type</div>
              <div className="font-medium">
                {ctx.formData.job_type.replace("_", " ")}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Experience</div>
              <div className="font-medium">
                {ctx.formData.years_of_experience_required}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Salary Range</div>
              <div className="font-medium">
                {ctx.formData.salary_range_min && ctx.formData.salary_range_max
                  ? `USD ${ctx.formData.salary_range_min.toLocaleString()} - ${ctx.formData.salary_range_max.toLocaleString()}`
                  : "Not specified"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Location</div>
              <div className="font-medium">{ctx.formData.job_location}</div>
            </div>
          </div>

          {ctx.formData.company_description && (
            <Section title="About the Company">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.company_description}
              </p>
            </Section>
          )}

          <Section title="Job Description">
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: ctx.formData.job_description }}
            />
          </Section>

          <Section title="Required Skills">
            <div className="flex flex-wrap gap-2">
              {ctx.formData.required_skills.split(",").map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </Section>

          {ctx.formData.educational_requirements && (
            <Section title="Educational Requirements">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.educational_requirements}
              </p>
            </Section>
          )}

          {ctx.formData.languages && (
            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {ctx.formData.languages.split(",").map((language: string) => (
                  <span
                    key={language}
                    className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm"
                  >
                    {language.trim()}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {ctx.formData.additional_benefits && (
            <Section title="Additional Benefits">
              <p className="text-gray-700 leading-relaxed">
                {ctx.formData.additional_benefits}
              </p>
            </Section>
          )}

          {ctx.formData.job_tags && (
            <Section title="Tags">
              <div className="flex flex-wrap gap-2">
                {ctx.formData.job_tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </section>

        <section className="w-full h-fit p-6 pb-8">
          <p className="text-sm text-[#898989]">
            Thank you for taking the time to apply for the&nbsp;
            {ctx.formData.job_title} position at&nbsp;
            {ctx.formData.company_name} and for sharing your qualifications and
            experiences with us.
            <br />
            As the next step in our hiring process, we'd love to invite you to
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
                    <CheckIcon className="w-4 h-4" />
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
                    className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                  />
                ) : (
                  <label className="block text-gray-700 text-sm font-medium">
                    {question.title}
                  </label>
                )}
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                  placeholder="Type your answer here"
                  value={question.answer}
                  onChange={(e) => handleTextareaChange(e, i)}
                />
                <span className="absolute bottom-[115px] right-4 text-xs font-medium text-gray-500">
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
            className="w-full flex items-center justify-center gap-2 mt-6 px-4"
          >
            <PlusCircleIcon />
            <span className="capitalize font-bold">Add custom question</span>
          </button>

          <div className="flex justify-center">
            <button
              onClick={handleSaveScreeningQuestions}
              className=" bg-primary text-white p-3 rounded-lg mt-8 font-medium hover:bg-primary/90 transition-colors"
            >
              Save Screening Questions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateJobScreening;

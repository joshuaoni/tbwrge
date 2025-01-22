import { forwardRef } from "react";

const CoverLetterTemplate2 = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="bg-gray-50 border border-gray-200 text-xs flex items-center justify-center"
    >
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-3xl w-full">
        <div className="flex justify-between items-start">
          {/* Left Section */}
          <div>
            <h1 className="text-base font-semibold">Munzurul Hasan</h1>
            <p className="text-sm text-gray-600 font-medium mt-2">
              UX Designer
            </p>
          </div>

          {/* Right Section */}
          <div className="text-right">
            <p className="text-sm text-gray-600 font-medium">www.hasan.pro</p>
            <p className="text-sm text-gray-600">hassanwhat@gmail.com</p>
            <p className="text-sm text-gray-600">+88 01752 23444</p>
          </div>
        </div>

        {/* Letter Content */}
        <div className="mt-6">
          <p className="font-semibold text-base">Dear Hiring Manager,</p>
          <p className="mt-4 text-gray-700">
            I am writing to express my strong interest in the Product Designer
            role at your company. With my passion for design, creativity, and
            user experience, I am confident that I can make a valuable
            contribution to your team.
            <br />
            <br />
            I have five years of experience in product design. During my time as
            a product designer, I have honed my skills in user-centered design,
            prototyping, and user testing. I have worked with a wide range of
            products, including consumer electronics, household appliances, and
            furniture. My experience has taught me the importance of
            collaboration, attention to detail, and a user-focused approach to
            design.
            <br />
            <br />
            I was particularly drawn to your company because of its reputation
            for innovation and its commitment to improving the lives of its
            users. I am excited about the opportunity to work with a team of
            talented designers and product managers to create meaningful and
            impactful products.
            <br />
            <br />
            I am proficient in a variety of design tools, including Sketch,
            Figma, and Adobe Creative Suite. I have a strong understanding of
            design principles and a talent for creating intuitive and
            aesthetically pleasing user interfaces. I am also a quick learner,
            adaptable, and able to work effectively in fast-paced environments.
            <br />
            <br />
            Thank you for considering my application. I look forward to the
            opportunity to further discuss my qualifications and how I can
            contribute to your team. Please find my portfolio attached for your
            review.
          </p>
        </div>

        {/* Closing */}
        <div className="mt-6">
          <p>Best regards,</p>
          <p>Munzurul Hasan</p>
        </div>
      </div>
    </div>
  );
});

export default CoverLetterTemplate2;

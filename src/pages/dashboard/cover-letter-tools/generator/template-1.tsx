function CoverLetterTemplate1() {
  return (
    <div className="relative max-w-4xl mx-auto p-4 flex justify-center bg-white border border-gray-200 rounded-lg text-xs">
      <div className="w-1/4 mt-28">
        <p className="">
          <span className="font-bold">Munzurul Hasan</span>
          <br />
          Dhaka, Bangladesh
        </p>

        <p className="mt-6">
          <span className="font-bold">To</span>
          <br />
          <span className="font-semibold">HR Manager Name</span>
          <br />
          New York, United States
        </p>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-[16%] py-4 px-2 flex flex-col items-end bg-white">
        <span className="uppercase tracking-widest text-base font-semibold">
          date
        </span>
        <span className="font-bold">-</span>
        <span>13 February 2023</span>
      </div>

      <div className="border-l-2 border-black pl-6 ml-6 w-2/3">
        <h3 className="text-xl font-extralight">Munzurul Hassan</h3>
        <p className="border-b-2 border-orange-300 w-fit font-extralight text-base mb-6">
          Product Designer
        </p>
        <p className="font-semibold">Dear Hiring Manager,</p>

        <p className="mt-2 text-gray-700">
          I am writing to express my strong interest in the Product Designer
          role at your company. With my passion for design, creativity, and user
          experience, I am confident that I can make a valuable contribution to
          your team.
          <br />
          <br />
          I have five years of experience in product design. During my time as a
          product designer, I have honed my skills in user-centered design,
          prototyping, and user testing. I have worked with a wide range of
          products, including consumer electronics, household appliances, and
          furniture. My experience has taught me the importance of
          collaboration, attention to detail, and a user-focused approach to
          design.
          <br />
          <br />
          I was particularly drawn to your company because of its reputation for
          innovation and its commitment to improving the lives of its users. I
          am excited about the opportunity to work with a team of talented
          designers and product managers to create meaningful and impactful
          products.
          <br />
          <br />
          I am proficient in a variety of design tools, including Sketch, Figma,
          and Adobe Creative Suite. I have a strong understanding of design
          principles and a talent for creating intuitive and aesthetically
          pleasing user interfaces. I am also a quick learner, adaptable, and
          able to work effectively in fast-paced environments.
          <br />
          <br />
          Thank you for considering my application. I look forward to the
          opportunity to further discuss my qualifications and how I can
          contribute to your team. Please find my portfolio attached for your
          review.
        </p>

        <div className="mt-6">
          <p>Best regards,</p>
          <p className="font-bold">Munzurul Hasan</p>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterTemplate1;

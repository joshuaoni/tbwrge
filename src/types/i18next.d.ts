import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: {
        nav: {
          dashboard: string;
          jobs: string;
          candidates: string;
          analytics: string;
          settings: string;
          logout: string;
          home: string;
          about: string;
          pricing: string;
          blog: string;
          community: string;
          jobBoard: string;
          talentPool: string;
          postedJobs: string;
          myApplications: string;
          submitArticle: string;
          billingSubscription: string;
          feedbackSupport: string;
          adminDashboard: string;
        };
        dashboard: {
          welcome: string;
          stats: string;
          recentActivity: string;
          quickActions: string;
          notifications: string;
          totalJobPosts: string;
          qualifiedApplicants: string;
          rejectedCandidates: string;
          totalApplications: string;
          findRightCandidate: string;
          accelerateHiring: string;
          subscribePremium: string;
          activity: string;
          user: string;
        };
        jobs: {
          title: string;
          createNew: string;
          createNewJobPost: string;
          applications: string;
          candidates: string;
          status: string;
          posted: string;
          active: string;
          closed: string;
          draft: string;
        };
        jobBoard: {
          title: string;
          backToJobs: string;
          backToApplications: string;
          viewApplications: string;
          aboutCompany: string;
          jobDescription: string;
          requiredSkills: string;
          educationalRequirements: string;
          languages: string;
          additionalBenefits: string;
          tags: string;
          jobType: string;
          experience: string;
          salaryRange: string;
          location: string;
          notSpecified: string;
          fullTime: string;
          hybrid: string;
          partTime: string;
          internship: string;
          skills: string;
          pressEnterToAdd: string;
          searchWithAI: string;
          audioSearch: string;
          textSearch: string;
          pleaseRecordSearch: string;
          search: string;
          previous: string;
          next: string;
          noJobsFound: string;
          jobTitle: string;
          applied: string;
          pending: string;
          accepted: string;
          shortlisted: string;
          rejected: string;
        };
        jobApplication: {
          title: string;
          applicationSubmitted: string;
          alreadyApplied: string;
          viewYourApplications: string;
          applicationSubmittedSuccessfully: string;
          thankYouMessage: string;
          fullName: string;
          email: string;
          phoneNumber: string;
          dateOfBirth: string;
          linkedinProfile: string;
          currentCompany: string;
          currentPosition: string;
          nationality: string;
          countryOfResidence: string;
          relevantExperience: string;
          skillsSummary: string;
          uploadCV: string;
          uploadCoverLetter: string;
          uploadVideo: string;
          enterYourName: string;
          enterYourEmail: string;
          enterYourPhone: string;
          enterLink: string;
          enterNA: string;
          selectNationality: string;
          selectCountry: string;
          describePastRoles: string;
          highlightSkills: string;
          enterYourAnswer: string;
          submitApplication: string;
          submitting: string;
          required: string;
        };
        applications: {
          title: string;
          showingApplications: string;
          applicationId: string;
          appliedDate: string;
          company: string;
          fitScore: string;
          noApplicationsFound: string;
          page: string;
        };
        feedback: {
          title: string;
          description: string;
          name: string;
          feedbackType: string;
          feedbackDetails: string;
          attachScreenshot: string;
          newFeatureSuggestion: string;
          featureIdea: string;
          improvement: string;
          bug: string;
          generalComment: string;
          submitFeedback: string;
          feedbackSubmitted: string;
        };
        coverLetterTools: {
          generator: {
            title: string;
            cvUpload: string;
            cvUploadDescription: string;
            dragFiles: string;
            browse: string;
            maxFileSize: string;
            supportedFormats: string;
            additionalDetails: string;
            additionalDetailsSubtext: string;
            addDetailsPlaceholder: string;
            jobDescriptionTitle: string;
            jobDescriptionPlaceholder: string;
            recordVoicenote: string;
            recording: string;
            record: string;
            selectOutputLanguage: string;
            generateCoverLetter: string;
            downloadTemplate1: string;
            downloadTemplate2: string;
            downloadTemplate3: string;
            generatingPDF: string;
            pdfSuccess: string;
            pdfError: string;
            templateNotAvailable: string;
          };
          ranking: {
            title: string;
            uploadTitle: string;
            uploadDescription: string;
            customizeResults: string;
            addPrompts: string;
            inputPrompt: string;
            jobDescriptionTitle: string;
            jobDescriptionPlaceholder: string;
            rankCoverLetter: string;
            rankBy: string;
            candidateName: string;
            uploadToSeeResults: string;
          };
          rewriter: {
            title: string;
            documentUpload: string;
            documentUploadDescription: string;
            jobDescriptionTitle: string;
            jobDescriptionPlaceholder: string;
            rewrite: string;
            uploadAndRewrite: string;
          };
          summarizer: {
            title: string;
            description: string;
            upload: {
              title: string;
              description: string;
              selectFile: string;
            };
            customize: {
              title: string;
              subTitle: string;
            };
            length: {
              label: string;
              short: string;
              medium: string;
              long: string;
            };
            selectOutputLanguage: string;
            generateSummary: string;
            generating: string;
            generatedSummary: string;
            summaryPlaceholder: string;
            downloadFilename: string;
            summaryGenerated: string;
            generationError: string;
            exampleSummaries: {
              short: string;
              medium: string;
              long: string;
            };
          };
          translator: {
            title: string;
            upload: {
              title: string;
              description: string;
            };
            customize: {
              title: string;
              subTitle: string;
            };
            promptPlaceholder: string;
            selectTargetLanguage: string;
            translateCoverLetter: string;
            translating: string;
            translatedCoverLetter: string;
            translationPlaceholder: string;
          };
          vetting: {
            title: string;
            upload: {
              title: string;
              description: string;
            };
            jobDescription: {
              title: string;
              subTitle: string;
            };
            jobDescriptionPlaceholder: string;
            vetCoverLetter: string;
            analyzing: string;
            vettingResults: string;
            resultsPlaceholder: string;
            score: string;
            analysis: string;
            recommendations: string;
          };
          common: {
            maxFilesError: string;
            maxFilesAlert: string;
            fileSizeMB: string;
            uploading: string;
            loading: string;
            error: string;
            success: string;
          };
        };
        tools: {
          jobsTools: string;
          cvTools: string;
          generator: string;
          vetting: string;
          translator: string;
          summarizer: string;
          ranking: string;
          rewriter: string;
          candidateReportGenerator: string;
          aiInterviewScreeningGenerator: string;
          aiScreeningQuestionsAssistant: string;
          aiInterviewPrep: string;
          matchingRanking: string;
          headToHead: string;
        };
        articlesCommunity: {
          title: string;
          loadingPosts: string;
          loadingBlogs: string;
          errorLoadingArticles: string;
          errorLoadingBlogs: string;
          article: string;
          post: string;
          anonymous: string;
          comment: string;
          upvotes: string;
        };
        logout: {
          title: string;
          dialogTitle: string;
          confirmMessage: string;
          confirmButton: string;
        };
        common: {
          save: string;
          cancel: string;
          delete: string;
          edit: string;
          view: string;
          search: string;
          searchForJobs: string;
          filter: string;
          export: string;
          import: string;
          loading: string;
          error: string;
          success: string;
          warning: string;
          info: string;
          chat: string;
          notSet: string;
        };
        forms: {
          email: string;
          password: string;
          confirmPassword: string;
          firstName: string;
          lastName: string;
          company: string;
          position: string;
          required: string;
          invalidEmail: string;
        };
        auth: {
          signIn: string;
          signUp: string;
          signOut: string;
          forgotPassword: string;
          resetPassword: string;
          createAccount: string;
          alreadyHaveAccount: string;
          dontHaveAccount: string;
        };
        language: {
          selectLanguage: string;
          searchLanguage: string;
          english: string;
          french: string;
          spanish: string;
          german: string;
          arabic: string;
          portuguese: string;
          chinese: string;
        };
        screening: {
          title: string;
          jobNotFound: string;
          jobNotFoundMessage: string;
          goBack: string;
          jobType: string;
          experience: string;
          salaryRange: string;
          location: string;
          aboutCompany: string;
          jobDescription: string;
          requiredSkills: string;
          educationalRequirements: string;
          languages: string;
          additionalBenefits: string;
          tags: string;
          screeningIntro: string;
          typeAnswerHere: string;
          submitting: string;
          submitScreeningAnswers: string;
          successTitle: string;
          successMessage: string;
        };
        submitArticle: {
          title: string;
          articleDetails: string;
          articleTitle: string;
          articleContent: string;
          articleContentNote: string;
          uploadArticle: string;
          uploadArticleNote: string;
          authorInformation: string;
          fullName: string;
          jobTitle: string;
          company: string;
          uploadProfileImage: string;
          contactInformation: string;
          email: string;
          agreeTerms: string;
          submitting: string;
          submitArticle: string;
          enterArticleTitle: string;
          writeArticleContent: string;
          enterYourName: string;
          enterJobTitle: string;
          enterCompany: string;
          enterEmail: string;
        };
        support: {
          title: string;
          description: string;
          name: string;
          email: string;
          supportCategory: string;
          generalInquiry: string;
          technicalSupport: string;
          billingInquiry: string;
          reportProblem: string;
          subject: string;
          description2: string;
          attachScreenshot: string;
          preferredContactMethod: string;
          phone: string;
          submitSupport: string;
          submitting: string;
          faq: {
            whatIsCandivet: {
              title: string;
              content: string;
            };
            upgradeSubscription: {
              title: string;
              content: string;
            };
            resetPassword: {
              title: string;
              content: string;
            };
            dataAfterCancel: {
              title: string;
              content: string;
            };
            createCV: {
              title: string;
              content: string;
            };
            rankingTips: {
              title: string;
              content: string;
            };
          };
          stillHaveQuestions: string;
          contactUs: string;
        };
        jobPostings: {
          title: string;
          currentOpenings: string;
          closedJobs: string;
          stats: {
            totalJobPosts: string;
            qualifiedApplicants: string;
            totalApplicants: string;
          };
          table: {
            jobTitle: string;
            jobId: string;
            totalApplicants: string;
            recruiter: string;
            company: string;
            endDate: string;
            candidateName: string;
            id: string;
            fitScore: string;
            yoe: string;
            keySkills: string;
            applicationDate: string;
            attachments: string;
            attachment: string;
          };
          embed: {
            embedJobs: string;
            selectJobsToEmbed: string;
            selectJobsDescription: string;
            selected: string;
            job: string;
            jobs: string;
            cancel: string;
            generateEmbedCode: string;
            pleaseSelectJob: string;
            embedCodeCopied: string;
          };
          candidateDetails: {
            generateReport: string;
            rejectCandidate: string;
            markAsFit: string;
            profileOverview: string;
            fitScore: string;
            email: string;
            phone: string;
            dob: string;
            linkedin: string;
            viewProfile: string;
            notProvided: string;
            currentPosition: string;
            company: string;
            nationality: string;
            location: string;
            salaryRange: string;
            profileSummary: string;
            aiInsights: string;
            keySkills: string;
            strengths: string;
            areasForDevelopment: string;
            cultureFitIndicators: string;
            languages: string;
            otherQuestions: string;
            questionNotAvailable: string;
            noAnswerProvided: string;
            noQuestionsAnswered: string;
            supportingDocuments: string;
            cvSuffix: string;
            clickToView: string;
            coverLetterSuffix: string;
            candidateVoicenote: string;
            clickToListen: string;
            addNotes: string;
            enterNoteHere: string;
            date: string;
            notes: string;
            loadingNotes: string;
            noNotesAvailable: string;
            screeningQuestions: string;
            screeningFitScore: string;
            noScreeningQuestionsAnswered: string;
            screeningAiInsights: string;
            noAiInsightsAvailable: string;
          };
          actions: {
            editJob: string;
            copyJobLink: string;
            copyEmbedCode: string;
            copyScreeningLink: string;
            closeJob: string;
            jobLinkCopied: string;
            embedCodeCopied: string;
            screeningLinkCopied: string;
            closingJob: string;
            jobClosedSuccess: string;
            jobClosedSuccessAlt: string;
            jobCloseError: string;
            jobCloseErrorAlt: string;
          };
          jobDetails: {
            tools: string;
            summarize: string;
            allCandidates: string;
            shortlistedCandidates: string;
            rejectedCandidates: string;
            screenedCandidates: string;
            noCandidatesFound: string;
            noCandidatesDescription: {
              all: string;
              shortlisted: string;
              rejected: string;
              screened: string;
            };
          };
          edit: {
            title: string;
            loadingEditor: string;
            editorPlaceholder: string;
            jobTitle: string;
            jobLocation: string;
            jobDetails: {
              jobType: string;
              experience: string;
              experiencePlaceholder: string;
              salaryRange: string;
              salaryMin: string;
              salaryMax: string;
              location: string;
            };
            jobTypeOptions: {
              fullTime: string;
              partTime: string;
              contract: string;
              internship: string;
              freelance: string;
            };
            sections: {
              aboutCompany: string;
              jobDescription: string;
              jobDescriptionPlaceholder: string;
              requiredSkills: string;
              requiredSkillsPlaceholder: string;
              educationalRequirements: string;
              educationalRequirementsPlaceholder: string;
              languages: string;
              languagesPlaceholder: string;
              additionalBenefits: string;
              additionalBenefitsPlaceholder: string;
              tags: string;
              tagsPlaceholder: string;
              jobDuration: string;
              startDate: string;
              endDate: string;
              jobRequirements: string;
              jobVisibility: string;
              applicationQuestions: string;
              recruiterCalendar: string;
              minimumFitScore: string;
              additionalSettings: string;
            };
            requirements: {
              requireCv: string;
              requireCoverLetter: string;
              requireVoicenote: string;
            };
            visibility: {
              makeJobPublic: string;
              hideSalaryRange: string;
            };
            questions: {
              jobApplicationQuestions: string;
              screeningQuestions: string;
              enterQuestion: string;
              enterScreeningQuestion: string;
              remove: string;
              addApplicationQuestion: string;
              addScreeningQuestion: string;
            };
            calendar: {
              placeholder: string;
            };
            settings: {
              autoSendInterviewEmails: string;
              hideCandidatesPersonalDetails: string;
            };
            tags: {
              helpText: string;
            };
            actions: {
              cancel: string;
              updateJob: string;
              updating: string;
            };
            messages: {
              updateSuccess: string;
              updateError: string;
            };
          };
        };
      };
    };
  }
}

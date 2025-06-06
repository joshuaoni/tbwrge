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
        };
      };
    };
  }
}

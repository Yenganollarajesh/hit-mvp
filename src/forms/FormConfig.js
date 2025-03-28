export default {
  pages: [
    {
      id: 'productType',
      questionArray: [
        {
          question: "First, tell us what kind of product you're building?",
          description: 'This helps us understand your product better and give relevant suggestions.',
          mandatory: true,
          pressEnter: false,
          fields: [
            {
              type: 'radio',
              valueKey: 'productType',
              productType: '',
              validation: ['required'],
              options: [
                {
                  displayText: 'SaaS (Software as a Service)',
                  displaySubText: 'Subscription-based software that users access online, like Salesforce or Slack',
                  value: 'SaaS',
                },
                {
                  displayText: 'Consumer App',
                  displaySubText: 'An app focused on individual users, like fitness trackers or personal finance apps',
                  value: 'Consumer',
                },
                {
                  displayText: 'Business Software',
                  displaySubText: 'Software used by companies where different employees need different access levels',
                  value: 'BusinessSoftware',
                },
                {
                  displayText: 'Marketplace',
                  displaySubText: 'Platform connecting buyers and sellers, like an online store or booking system',
                  value: 'Marketplace',
                },
                {
                  displayText: 'Learning Platform',
                  displaySubText: 'Where people can teach or learn, like online courses',
                  value: 'LearningPlatform',
                },
                {
                  displayText: 'Community Platform',
                  displaySubText: 'Where users connect and share content with each other',
                  value: 'CommunityPlatform',
                },
                {
                  displayText: 'Something else',
                  displaySubText: 'Tell us about your unique product idea',
                  value: 'Somethingelse',
                },
              ],
            },
          ],
        },
      ],
      previousQuestionId: '',
      nextQuestionId: 'productIdea',
      progress: 3,
      button: {
        label: 'Continue',
        action: 'next',
      },
    },
    {
      id: 'productIdea',
      questionArray: [
        {
          question: 'What should we call your product/idea?',
          description:
            "Don't worry, you can change this later. Be as detailed as possible so that we can give you a more useful plan",
          mandatory: true,
          pressEnter: true,
          fields: [
            {
              type: 'text',
              placeholder: '',
              valueKey: 'productIdea',
              productIdea: '',
              validation: ['required'],
              placeholderValues: {
                SaaS: 'For example: ProjectFlow - Project Management Made Simple',
                Somethingelse: 'For example: Your Product Name',
                CommunityPlatform: 'For example: FoodieShare',
                LearningPlatform: 'For example: SkillMaster',
                Marketplace: 'For example: CraftBazaar',
                BusinessSoftware: 'For example: TeamFlow',
                Consumer: 'For example: FitTrack Pro',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'productDescription',
      previousQuestionId: 'productType',
      progress: 0,
    },
    {
      id: 'productDescription',
      questionArray: [
        {
          question: 'How would you describe your product in one line?',
          description:
            'If you have an elevator pitch for your idea, let us know about it.  Be as detailed as possible so that we can give you a more useful plan',
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'productDescription',
              productDescription: '',
              placeholderValues: {
                SaaS: 'For example: Help teams manage projects more efficiently by bringing tasks, timelines, files, and team communication into one easy-to-use platform. Replace messy spreadsheets and scattered tools with a single source of truth for project management',
                Somethingelse: 'For example: \nTell us the main purpose of your product',
                CommunityPlatform:
                  'For example: \nBring food lovers together to share recipes, cooking tips, and food experiences in an engaging social platform.',
                LearningPlatform:
                  'For example: \nHelp professionals learn new skills through expert-led courses that fit their schedule and learning style.',
                Marketplace:
                  'For example: \nConnect local artisans with customers worldwide, making it easy to discover and buy unique handmade products.',
                BusinessSoftware:
                  "For example: \nHelp teams collaborate better by bringing all their work into one organized platform that's easy to use and saves time.",
                Consumer:
                  'For example: \nWe want to help busy people stay fit by making it super easy to track their workouts and eating habits. Kind of like having a fitness coach in your pocket!',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'avaliableDevices',
      previousQuestionId: 'productIdea',
      progress: 40,
    },
    {
      id: 'avaliableDevices',
      questionArray: [
        {
          question: 'What devices will the product be available on?',
          description:
            'Think about phones, tablets, computers for different types of users.  Be as detailed as possible so that we can give you a more useful plan',
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'avaliableDevices',
              avaliableDevices: '',
              placeholderValues: {
                SaaS: 'For example: Most users will access our web app for daily project management. Team members also get mobile apps (iOS/Android) for updates on the go. Project managers and admins use the web interface for detailed work. Each organization gets their own workspace that their admin can customize. Our support team uses a special admin dashboard to help customers.',
                Somethingelse: 'For example: \nTell us how different users will access your product',
                CommunityPlatform:
                  'For example: \nMembers use mobile apps and website to share content. Moderators have special web tools for content review. Admins manage everything through a control panel',
                LearningPlatform:
                  'For example: \nStudents access courses through web and mobile apps. Instructors use web interface to create and manage courses. Admins have a dashboard for platform management.',
                Marketplace:
                  'For example: \nBuyers will use mobile apps and website to shop. Sellers get a web dashboard to manage products and orders. Our support team uses a service desk interface.',
                BusinessSoftware:
                  'For example: \nTeam members will use web and mobile apps for daily tasks. Managers get a web dashboard with advanced features. Admins have a separate control panel for system settings.',
                Consumer:
                  'For example: \nUsers will mostly use it on their phones (iPhone and Android apps) since they need to track activities throughout the day. They can also check their progress on a website. Our admin team will have a separate dashboard to manage everything.',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'problemsFaced',
      previousQuestionId: 'productDescription',
      progress: 40,
    },
    {
      id: 'problemsFaced',
      questionArray: [
        {
          question: 'What problems are your future users facing today?',
          description:
            "Don't worry, you can change this later. Be as detailed as possible so that we can give you a more useful plan",
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'problemsFaced',
              problemsFaced: '',
              placeholderValues: {
                SaaS: "For example: \nTeams struggle with projects scattered across different tools - tasks in one place, files in another, and discussions in email. This causes confusion, missed deadlines, and lots of time wasted in status update meetings. Managers can't easily see project progress, and team members waste time switching between tools.",
                Somethingelse: 'For example: \nTell us what problems your product will solve',
                CommunityPlatform:
                  'For example: \nFood enthusiasts lack a dedicated space to share recipes and get feedback. Existing platforms mix too many topics.',
                LearningPlatform:
                  "For example: \nProfessionals can't find quality courses that fit their schedule. Traditional training is expensive and inflexible.",
                Marketplace:
                  "For example: \nArtisans struggle to reach customers beyond local markets. Buyers can't find authentic handmade products easily. Both sides lack a trusted platform.",
                BusinessSoftware:
                  'For example: \nTeams waste time switching between tools. Managers lack visibility into project status. Information gets scattered across emails and chats.',
                Consumer:
                  "For example: \nPeople start fitness programs but give up because it's hard to track everything. They lose motivation and find most apps too complicated.",
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'peopleUsingYourProduct',
      previousQuestionId: 'avaliableDevices',
      progress: 40,
    },
    {
      id: 'peopleUsingYourProduct',
      questionArray: [
        {
          question: "Who are the different people who'll be using your product?",
          description:
            "Tell us about your main users and anyone who'll help manage the product.  Be as detailed as possible so that we can give you a more useful plan ",
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'peopleUsingYourProduct',
              peopleUsingYourProduct: '',
              placeholderValues: {
                SaaS: 'For example: \n1. Team Members: Regular users who update tasks and collaborate daily\n2. Project Managers: Create projects, assign work, track progress\n3. Department Heads: Track multiple projects and team performance\n\n4. Organization Admins: Set up workspace and manage user access\n5. Super Admins (our team): Manage the platform and help customers',
                Somethingelse: 'For example: \nTell us about the different types of users for your product',
                CommunityPlatform:
                  'For example: \nRegular Members: Sharing recipes \nPremium Members: Extra features \nModerators: Content quality \nAdmin: Platform management',
                LearningPlatform:
                  'For example: \nStudents: Professionals seeking skills \nInstructors: Industry experts \nCourse Admins: Content quality \nSuper Admin: Platform operations',
                Marketplace:
                  'For example: \nBuyers: People seeking unique crafts\nSellers: Artisans and craftspeople\nSupport Team: Handling customer service\nAdmin: Managing the platform',
                BusinessSoftware:
                  'For example: \nEnd Users: Team members tracking tasks\nManagers: Overseeing projects\nAdmins: Managing company settings\nSuper Admin: Platform management',
                Consumer:
                  'For example: \nMain users: Working professionals 25-45 who want to get fit but struggle with consistency. Admin team: Managing the app, support, and content.',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'thingsToDoWithProduct',
      previousQuestionId: 'problemsFaced',
      progress: 40,
    },
    {
      id: 'thingsToDoWithProduct',
      questionArray: [
        {
          question: 'What are the main things users will be able to do with your product?',
          description:
            'List the most important features for different types of users.  Be as detailed as possible so that we can give you a more useful plan',
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'thingsToDoWithProduct',
              thingsToDoWithProduct: '',
              placeholderValues: {
                SaaS: 'For example: \nTeam Members can:\n- View and update their tasks\n- Share files and comments\n- Track time spent\n- See project timelines\n- Chat with teammates\n\nProject Managers can:\n- Create project plans\n- Assign and track work\n- Generate progress reports\n- Manage team workload\n- Set up automation rules\nOrganization Admins can:\n- Add/remove users\n- Set permissions\n- Customize workflows\n- Configure integrations\n- Access usage analytics\n\nSuper Admins can:\n- Manage all organizations\n- Monitor system health\n- Provide customer support\n- Update global settings',
                Somethingelse: 'For example: \nTell us the main features for each type of user',
                CommunityPlatform:
                  'For example: \nMembers can: \n- Share content \n- Connect with others \n- Join discussions \n- Save favorites \n\nModerators can: \n- Review content \n- Manage reports \n- Guide discussions \n\nAdmins can: \n- Manage platform \n- Track engagement \n- Update features',
                LearningPlatform:
                  'For example: \nStudents can: \n- Take courses \n- Track progress \n- Practice skills \n- Get certificates \n\nInstructors can: \n- Create courses \n- Manage content \n- Track students \n\nAdmins can: \n- Review content \n- Manage users \n- Monitor quality',
                Marketplace:
                  'For example: \nBuyers can:\n- Browse products\n- Place orders\n- Pay securely\n- Leave reviews\n\nSellers can:\n- List items\n- Manage inventory\n- Process orders\n- Track earnings\n\nAdmin team:\n- Verify sellers\n- Manage disputes\n- Monitor platform',
                BusinessSoftware:
                  'For example: \nUsers can:\n- Manage tasks and projects\n\n- Track time\n- Share files\n- Collaborate in real-time\n\nManagers can:\n- Assign work\n- View team progress\n- Generate reports\n\nAdmins can:\n- Configure settings\n- Manage permissions\n- Monitor usage',
                Consumer:
                  'For example: \nUsers can:\n- Log workouts easily\n- Track meals with photos\n- Get workout suggestions\n- See their progress\n- Join challenges\n\nAdmin team:\n- Manage users\n- Update content\n- Track usage',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Continue',
        action: 'next',
      },
      nextQuestionId: 'yourProductMakeMoney',
      previousQuestionId: 'peopleUsingYourProduct',
      progress: 40,
    },
    {
      id: 'yourProductMakeMoney',
      questionArray: [
        {
          question: 'Who are the different  How will your product make money?',
          description:
            "Tell us about your planned pricing or other ways you'll generate revenue. Be as detailed as possible so that we can give you a more useful plan ",
          mandatory: false,
          pressEnter: true,
          fields: [
            {
              type: 'textarea',
              placeholder: '',
              valueKey: 'peopleUsingYourProduct',
              peopleUsingYourProduct: '',
              placeholderValues: {
                SaaS: 'For example: \nMonthly per-user subscriptions:\nStarter: $12/user/month\n- Basic projects and tasks\n- File sharing\n- Team chat\nPro: $25/user/month\n- Custom workflows\n- Time tracking\n- Advanced reporting\n- Priority support\nEnterprise: Custom pricing\n- Custom integrations\n- Dedicated support\n- Advanced security\n- API access\n\nAdd-ons:\n- Extra storage\n- Guest access\n- Premium integrations',
                Somethingelse: 'For example: \nTell us how you plan to generate revenue',
                CommunityPlatform:
                  'For example: \nFree basic access. Premium membership ($5/month) for extra features. Sponsored content and partnerships.',
                LearningPlatform:
                  'For example: \nRevenue share with instructors (70/30). Platform fee from students. Enterprise licensing for companies.',
                Marketplace:
                  'For example: \nFree listings. Commission on sales (10-15%). Premium seller accounts ($50/month) with reduced fees. Featured listings and ads.',
                BusinessSoftware:
                  'For example: \nMonthly per-user subscriptions:\n- Basic: $10/user\n- Pro: $25/user\n- Enterprise: Custom pricing\nAdd-ons for special features',
                Consumer:
                  'For example: \nFree basic features. Premium subscription ($9.99/month) for advanced features like personalized plans and detailed analytics.',
              },
            },
          ],
        },
      ],
      button: {
        label: 'Submit',
        action: 'submit',
      },
      nextQuestionId: '',
      previousQuestionId: 'thingsToDoWithProduct',
      progress: 40,
    },
  ],
};

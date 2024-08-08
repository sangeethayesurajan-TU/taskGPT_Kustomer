import kview from './kview'

const setting_api = process.env.settings_api;
const login_api = process.env.login_api;
const generate_authtoken_api = process.env.generate_authtoken_api;
const auto_suggest_api = process.env.auto_suggest_api;
const logs_api = process.env.logs_api;
const heartbeat_api = process.env.heartbeat_api;
const apikey = process.env.apikey;
const authtoken= process.env.authtoken;
const generate_authtoken_api_democenter = process.env.generate_authtoken_api_democenter;
const url_def = process.env.url_def;
const dev_setting_api = process.env.dev_setting_api;
const dev_login_api = process.env.dev_login_api;
const dev_generate_authtoken_api = process.env.dev_generate_authtoken_api;


// When trying to install or use this template, make sure to postfix the `app` property below with a unique value.
// For example, my_first_app__myKustomerOrg01_01
export default {
    app: 'taskgpt',
    version: '0.0.124',
    description: "TaskGPT is a proprietary, secure GenAI platform powering a range of tools to help customer service teams deliver superior customer experiences. Its key real-time features enhance operational efficiency, decrease Average Handling Time (AHT), reduce human errors, boost accuracy and quality and increase consistency.\nTaskGPT does not store users' personal data, sensitive information or any other confidential data.\n\n### Tools:\n\n### Assist<sup>AI</sup>\n\n### A way to drive next-level CX, securely\nFormerly known as “TaskGPT KnowledgeAssist,” AssistAI digitizes and automates the customer experience through customized, contextually relevant responses tailored to your organization’s data and historical customer interaction.\nPowered by the TaskGPT platform, **Assist<sup>AI</sup>** is trained only on your existing knowledge base—documents such as FAQs, product manuals, policies, and any other information a teammate might need to answer customer queries or complete tasks.\n\n### Empower teams with instant knowledge and confidence\nWhen a representative sends a query, the tool analyzes it and then dives into the knowledge library to find the right answer. By understanding language context and recognizing intent, AssistAI provides concise responses, quickly.\nWhether interacting through email, chat, voice calls, in-app messaging, or SMS, AssistAI maintains consistency and quality in every customer exchange. It augments human capabilities, allowing your teams to tackle customer queries with the confidence that comes from having an AI-powered chatbot at their side.\n\n### Top benefits:\n* ### Decrease AHT\n* ### Improve interaction quality\n* ### Increase productivity\n* ### Increase efficiency\n* ### Boost CSAT\n* ### Boost ESAT\n* ### Decrease ACW\n* ### Ensure data security\n\n### Seamless integration\nAssistAI is compatible with our current infrastructure because it can work in any web environment, integrate smoothly with top CRMs like Zendesk, Salesforce and HubSpot, and mask sensitive information (PII).\n\n### Prompt<sup>AI</sup>\n### Chat excellence with precise response suggestions\nPrompt<sup>AI</sup> is a tool that suggests chat responses in real-time, eliminating the traditional time-consuming process of manually searching knowledge bases and free-writing responses.\n\nWhen a customer asks a question, PromptAI automatically searches for relevant information and suggests three responses with a corresponding confidence score. Teammates can quickly choose and modify as needed. The tool also measures response rate (how often a teammate picks a response) to enable constant response improvement.\n\n### Top benefits:\n\n* Increased efficiency\n* Decreased AHT\n* Higher CSAT",
    commands: [
        {
            name: "setting_api",
            displayName: "Setting",
            url: setting_api,
            // url: dev_setting_api,
            cacheSeconds: 15,
            httpMethod: "post",
            appSettings: {
                apikey: {
                    key: "taskgpt.default.apikey"
                },
                authtoken: {
                    key: "taskgpt.default.authtoken"
                }
            }
        },
        {
            name: "login_api",
            displayName: "Login",
            url: login_api,
            cacheSeconds: 15,
            httpMethod: "post",           
        },
        {
            name: "generate_authtoken_api",
            displayName: "Generatetoken",
            url: generate_authtoken_api,
            // url: generate_authtoken_api_democenter,
            cacheSeconds: 15,
            httpMethod: "post"
        },
        {
            name: "auto_suggest_api",
            displayName: "Autosuggest",
            url: auto_suggest_api,
            cacheSeconds: 15,
            httpMethod: "post"
        },
        {
            name: "logs_api",
            displayName: "Logsapi",
            url: logs_api,
            cacheSeconds: 15,
            httpMethod: "post"
        },
        {
            name: "heartbeat_api",
            displayName: "Heartbeatapi",
            url: `https://orchestrator.taskus.com/api/settings/{{user_setting}}/exthealth`,
            // url: heartbeat_api,
            cacheSeconds: 15,
            httpMethod: "get",
            permittedUrlArgs: ["user_setting"]
        }
    ],
    settings: {
        default: {
            authtoken: {
                type: "secret",
                defaultValue: authtoken,
                description: "EXTERNAL AUTH TOKEN"
            },
            apikey: {
                type: "secret",
                defaultValue: apikey,
                description: "External API Key"
            },
            url_def: {
                type: "string",
                defaultValue: url_def,
            }
        }
    },
    appDetails: { // note: the object and all it's fields are optional, but will be used to fill out the app store listing within Kustomer
        appDeveloper: {
            name: 'TaskUs',
            website: 'https://www.taskus.com/',
            supportEmail: 'TaskGPT@taskus.com',
        },
        externalPlatform: {
            name: 'TaskUs',
            website: 'https://www.taskus.com/',
        },        
    },
    title: 'TaskGPT',
    // iconUrl: 'https://pbs.twimg.com/profile_images/1146053597785993217/DcPQyO9Q_400x400.png',
    postInstallMessage: 'Congratulations! You\'ve installed TaskGPT app!',
    kviews: kview,
};

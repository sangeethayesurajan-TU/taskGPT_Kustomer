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
    version: '0.0.111',
    description: "TaskGPT is a Generative AI powered suite of products with GPT technology.\n\nTaskGPT is a Generative AI powered suite of solutions, utilizing GPT technology, designed to assist chat-based customer support representatives. It effectively handles customer queries by searching through a knowledge base of campaign information and presenting relevant responses from various articles. Each response is accompanied by a confidence score, indicating its reliability and potential impact on the representatives answers. The higher the score, the more influential it can be in shaping the responses provided by the support representatives.\n\nAdditionally, TaskGPT empowers the representatives with the flexibility to customize the selected response, allowing them to tailor it according to the ongoing conversation with customers. This ensures that the responses align seamlessly with the current flow of the interaction.\n\n**Note:** TaskGPT will not store user's any personal data, information, or any kind of sensitive data.\n**To install the TaskGPT App by TaskUs, please follow the below steps:**\n\n**Step 1:** Install the TaskGPT app through the Kustomer Marketplace.\n\n**Step 2:** To register your account, please contact us at [TaskGPT@taskus.com](mailto:TaskGPT@taskus.com).\n\n**Step 3:** Once the installation is complete, the app will be available in your Kustomer, currently viewing section, accessible by clicking on the ticket.\n\nIf you encounter any issues during the installation process, please contact our support team at [TaskGPT@taskus.com](mailto:TaskGPT@taskus.com) for assistance.",
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

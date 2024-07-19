const prod_orchestrator_url = "https://orchestrator.taskus.com";
let apiKEY = '4cXvYmIXmZswBTG';
let apiToken_s = 'bb7aa8dcd6a9e199231e004d4b7535a121d8c8aa4626ecc986bfc82d3de49a19'
let andwe = apiKEY;
let styledata = `
  .actionBtn{
    width:100%;
    height: 40px;
    color:white;
  }
    
  .actionBtn:hover{
    background-color: pink !important;
  }

  .loader {
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px dashed rgb(255, 255, 255);
    border-right: 3px dashed rgb(255, 255, 255);
    border-bottom: 3px dashed rgb(255, 255, 255);
    border-left: 3px dashed rgb(255, 255, 255);
    width: 20px;
    height: 20px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  .response-box {
    position: relative;
    margin: 10px 0px;
    border: 1px solid;
    background: #D3D3D3;
    text-align: justify;
    cursor: pointer;
    padding: 7px 10px;
    background: #FFFFFF;
    border: 1px solid #B3B3B3;
    border-radius: 8px;
    color: #282829;
    font-family: "poppins";
    font-weight: 400;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease-in-out;
  }

  .response-box:hover {
    background-color: #ebebeb;
  }

  .loader-prompt {
    border: 3px solid rgb(153, 8, 220);
    border-radius: 50%;
    border-top: 3px dashed rgb(153, 8, 220);
    border-right: 3px dashed rgb(153, 8, 220);
    border-bottom: 3px dashed rgb(153, 8, 220);
    border-left: 3px dashed rgb(153, 8, 220);
    width: 16px;
    height: 16px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  .copied-message {
    position: absolute;
    top: -20px;
    right: 151px;
    background-color: #005EFF;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    font-family: "poppins";
    border-radius: 5px;
    animation: fadeOut 2s forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

`
let styleSection = `\`${styledata}\``   ; 
export default {
  name: 'taskgpt', // replace organization with your Kustomer organization name

  template: `
    if (appSettings && appSettings.default) {
      const { useState, useEffect } = React;   
           
      //generate Auth Token API
      async function generateTokenApi(user_setting_response, emailId, isAuthuu) {
        try {
          const model_type = user_setting_response.settings.Zendesk_PromptoGPT_modeltype;
          const usecase = user_setting_response.settings.Zendesk_PromptoGPT_usecase;

          const promptoGPT_toggle = user_setting_response.settings.Zendesk_PromptoGPT_toggle;
          const knowledgeAssist_toggle = user_setting_response.settings.Zendesk_KnowledgeAssist_toggle;

          const apitoken = user_setting_response?.settings.x_apitoken;
          const apikey = user_setting_response?.settings.x_apikey;
          let endpoint = '/v1/commands/' + isAuthuu.appId + '.app.generate_authtoken_api/run';
          let authResponse = await KustomerRequest({
            url: endpoint,
            method: 'POST',
            body: {
              "headers": {
                "Content-Type": "application/json",
                "x-apitoken": apitoken,
                "x-apikey": apikey,
                "CF-Access-Client-Id": user_setting_response?.settings.CF_Access_Client_Id,
                "CF-Access-Client-Secret": user_setting_response?.settings.CF_Access_Client_Secret
              },
              "body": {
                "email": emailId
              }
            }
          },
            (err, response) => {
              if (err) {
                console.log("Into 1")
                return 'Failed to process return'
              } else if (response.responseBody.errors) {
                console.log("Into 2")
                return response.responseBody.errors.message;
              }
            }
          );
          const data = authResponse?.data?.attributes?.responseBody;
          const authToken = data.authToken;
          const clientAuthToken = data.clientAuthToken;
          return { authToken, clientAuthToken, model_type, usecase, promptoGPT_toggle, knowledgeAssist_toggle }
        } catch (err) {
          console.log("Error in generateTokenApi::", err);
        }
      }  

      const createPayload = (module, action) => {
        return [
          {
            module: module,
            event: action,
          },
        ];
      };
        
      async function logsAPI({ isAuthuu, user_setting, PAYLOAD_FOR_EVENT, UUID = null, log_message = null }) {
        let app_version = "1.0.0"
        try {
          let endpoint = '/v1/commands/' + isAuthuu.appId + '.app.logs_api/run'
          let auth = 'Bearer' + " " + user_setting?.authToken
          await KustomerRequest({
            url: endpoint,
            method: 'POST',
            body: {
              "headers": {
                "Authorization": auth,
                "Content-Type": "application/json"
              },
              "body": {
                "user_email": user_setting.email,
                "applicationName": "PromptoGPT",
                "event_list": PAYLOAD_FOR_EVENT,
                "user_id": user_setting.user_id,
                "app_id": user_setting.app_id,
                "app_name": "PromptoGPT",
                "campaign_name": user_setting.campaign_name,
                "campaign_id": user_setting.campaign_id,
                "lob_id": user_setting.lob_id,
                "lob_name": user_setting.lob_name,
                "currentUserAppVersion": app_version,
                "uuid": UUID,
                "log_message": log_message
              }
            }
          },
            (err, response) => {
              if (err) {
                console.log("Into 1")
                return 'Failed to process return'
              } else if (response.responseBody.errors) {
                console.log("Into 2")
                return response.responseBody.errors.message;
              }
            }
          );
        } catch (error) {
          console.log("Error in logsAPI::", error);
        }
      }

      const MyComponent = window.__myComponent12345 || (window.__myComponent12345 =
      function MyComponent(props) {
        const {
          conversation,
          appSettings
        } = props;

        const [isLoggedStatus, setLoggedStatus] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
        const [isSettingStatus, setSettingStatus] = useState(sessionStorage.getItem('settingStatus') === 'true');
        const [name, changeName] = useState('');
        const [ischeckboxType, setCheckboxType] = useState('');
        const [isLoading, setLoading] = useState(false);
        const [prompt_res, setPrompt_res] = useState(null);
        const [isApiCall, setApiCall] = useState(true);
        const [generateToken, setGenerateToken] = useState({});
        const [conv_id, setConv_id] = useState('');
        const [isEmail, setEmail] = useState('');
        const [isAuthuu, setAuthuu] = useState({});
        const[lastUserRes, setLastUserRes] = useState('');
        const[settingreg, setSettingreg] = useState({});
        const [isAutoLoading, setAutoLoading] = useState(false);
        const [copied, setCopied] = useState(null);
        const [channelType, setChannelType] = useState(null);

        function generateUUID() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        }

        async function autoSuggestApi(user_email, latestmsgfromuser, model_type, use_case, auth_token, isAuthuu, user_setting_infos) {
          setAutoLoading(true);
          let unique_uuid = generateUUID();
          const payload = createPayload(
            'Kustomer_PromptoGPT_Request_Query_Started',
            'Success'
          );
          await logsAPI({isAuthuu: isAuthuu, user_setting: user_setting_infos, PAYLOAD_FOR_EVENT: payload, UUID: unique_uuid });
          try {
            let endpoint = '/v1/commands/' + isAuthuu.appId + '.app.auto_suggest_api/run';
            let response = await KustomerRequest({
              url: endpoint,
              method: "POST",
              body: {
                "headers": {
                  "Content-Type": "application/json",
                  "X-Authtoken": auth_token
                },
                "body": {
                  "user_id": user_email,
                  "question": latestmsgfromuser,
                  "model_type": model_type.toLowerCase(),
                  "usecase": use_case.toLowerCase(),
                  "enable_automasking": true
                }
              }
            },
              (err, response) => {
                if (err) {
                  console.log("Into 1")
                  return 'Failed to process return'
                } else if (response.responseBody.errors) {
                  console.log("Into 2")
                  return response.responseBody.errors.message;
                }
              }
            );
            if (response?.data?.attributes?.responseBody) {
              let unique_uuid = generateUUID();
              const payload = createPayload(
                'Kustomer_PromptoGPT_Request_Query_Completed',
                'Success'
              );
              await logsAPI({ isAuthuu: isAuthuu, user_setting: user_setting_infos, PAYLOAD_FOR_EVENT: payload, UUID: unique_uuid });
              const payload_query = createPayload(
                'Kustomer_PromptoGPT_Request_Query',
                'Success'
              );
              let unique_uuid_query = generateUUID();
              await logsAPI({ isAuthuu: isAuthuu, user_setting: user_setting_infos, PAYLOAD_FOR_EVENT: payload_query, UUID: unique_uuid_query, log_message: latestmsgfromuser });
              setAutoLoading(false);
              return response?.data?.attributes?.responseBody;
            }

          } catch (error) {
            console.log("Error in autoSuggestApi::", error)
          }
        }

        useEffect(() => {
          let updatedAuth = {};
          (appSettings?.default || []).forEach((item) => {
            if (item.attributes.name === 'apikey') {
              updatedAuth.api_key = item.attributes.value;
            }
            if (item.attributes.name === 'authtoken') {
              updatedAuth.authtoken = item.attributes.value;
              updatedAuth.appId = item.attributes.app;
            }
            if (item.attributes.name === 'url_def') {
              updatedAuth.url_def = item.attributes.value;
              updatedAuth.appId = item.attributes.app;
            }
          });
          setAuthuu(updatedAuth);
        }, [appSettings?.default]);
        
        useEffect(() => {
        }, [isAuthuu, prompt_res, settingreg, isAutoLoading, isEmail, channelType]);

        useEffect(() => {
          KustomerRequest({ url: '/v1/users/current' }).then(result => {
            changeName(result.data.attributes.name);
            setEmail(result.data.attributes.email);
          });        
        }, []);

        useEffect(() => {
          if (conversation) {
            setConv_id(conversation?.id)
          }
          if (conv_id) {
            // let api_token = 'Bearer'+" "+process.env.API_TOKEN          
            let endpoint = '/v1/conversations/'+conv_id+'/messages';
            KustomerRequest({ url: endpoint, method: "GET"}).then((result) => {
              findLastResponse(result?.data)
            })
          }
          if ((lastUserRes) && (conv_id) && (ischeckboxType == 'promptogpt')) {
            // promptoGPTApi(isEmail, lastUserRes, generateToken?.model_type, generateToken?.usecase, generateToken?.authToken)
            const autosuggestResponse = async () => {
              try {
                await showPromptRes(isEmail, lastUserRes, generateToken?.model_type, generateToken?.usecase, generateToken?.authToken)
              } catch (err) {
                console.log("Error in autosuggestResponse::", err);
              }
            }
            autosuggestResponse();
          }
        }, [conversation, conv_id, generateToken, lastUserRes, ischeckboxType]);

        useEffect(() => {
          if ((isSettingStatus) && (isApiCall)) {
            if (isEmail) {
              // settingResponse();
              settingBtnAPI()
            }            
          }
        }, [isSettingStatus, isApiCall, isEmail]);

        useEffect(() => {
          if (generateToken) {
          }       
        }, [generateToken]);  

        async function findLastResponse(result) {
          try {
            {
              (result || []).map((item) => {
                if (item.attributes.direction === "in") {
                  setLastUserRes(item.attributes.preview)
                }
                if (item.attributes.direction === 'out') {
                  setLastUserRes('Agent')
                }
                if (item.attributes.channel === 'email') {
                  setChannelType("email")
                }
              })
            };
          } catch (error) {
            console.log("Error in findLastResponse::", result)
          }
        }        

        //Styles
        const divStyle = {
          display: 'flex',
          alignItems: "center",
          gap: "5px"
        };

        const promptoGpt_style = {
          padding: "7px 5px",
          margin: "10px 0px",
          border: "1px solid",
          background: "#D3D3D3",
          textAlign: "Justify"
        } 
          
        const common_style = { 
          fontFamily: "poppins", 
          fontSize: "16px", 
          color: "#000000"
        }

        async function showPromptRes(isEmail, lastUserRes, model_type, usecase, authToken) {
          try {
            let autosuggestResponse = await autoSuggestApi(isEmail, lastUserRes, model_type, usecase, authToken, isAuthuu, settingreg);            
            setPrompt_res({
              top_responses: autosuggestResponse?.top_responses,
              top_scores: autosuggestResponse?.top_scores
            });
          } catch (err) {
            console.log("Error in showPromptRes::", err)
          }
        }

        async function selectedCheckbox(value) {
          try {
            setCheckboxType(value)
            if (value === 'promptogpt') {
              const payload = createPayload(
                'Kustomer_PromptoGPT_ON',
                'Success'
              );
              const promptogpt_on_LogMsg = "PromptoGPT Turned ON";
              if (settingreg) {
                await logsAPI({ isAuthuu: isAuthuu, user_setting: settingreg, PAYLOAD_FOR_EVENT: payload, log_message: promptogpt_on_LogMsg });
              }                        
              
            } else {
              const payload = createPayload(
                'Kustomer_KnowledgeAssist_ON',
                'Success'
              );
              const knowledgeAssist_on_LogMsg = "KnowledgeAssist Turned ON";
              if (settingreg) {
                await logsAPI({ isAuthuu: isAuthuu, user_setting: settingreg, PAYLOAD_FOR_EVENT: payload, log_message: knowledgeAssist_on_LogMsg });
              }
            }
          } catch (err) {
            console.log("Error in selectedCheckbox::", err)
          }
        }

        function promptoGPTResponse() {
          let lst_ = ['hi', 'hello', 'how are you', 'what’s up', 'hey', 'good morning', 'good evening', 'good night', 'how do you do', 'how are you?', 'what’s up?', 'how do you do?', 'how are you ?', 'what’s up ?', 'how do you do ?'];
          
          let data = [];
          data = prompt_res?.top_scores.map((item, index) => {
            if (item != 0) {
              return prompt_res?.top_responses[index]
            }
          }).filter(response => response !== undefined);
          try {
            return (
              <>
                <div style={{
                  ...common_style,
                  margin: "10px 0px 5px",                                
                  fontWeight: "600",
                  color: "#000000",
                  fontFamily: "poppins",
                  fontSize: "16px"
                }}>
                  Query
                </div>
                <div
                  style={{
                    color: "#808080",
                    fontWeight: "500",
                    fontSize: "14px",
                    fontFamily: "poppins"
                  }}
                >
                  {lastUserRes}
                </div>

                {(isAutoLoading) ?
                  <div style={{
                    ...common_style,
                    margin: "10px 0px 5px",
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "14px",
                    display: "flex",
                    gap: "8px",
                    fontStyle: "normal",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}>
                    <span className={'loader-prompt'}></span>
                    <span style={{
                        color: 'transparent',
                        background: "linear-gradient(to left, rgb(220, 7, 213), rgb(6, 6, 192), rgb(161, 161, 5), rgb(153, 8, 220))",
                        WebkitBackgroundClip: "text",
                    }}
                    >PromptAI</span> is writing....
                  </div>
                  :
                  <div style={{
                    ...common_style,
                    margin: "10px 0px 5px",
                    fontWeight: "600",
                    color: "#000000"
                  }}>
                    Responses
                    {(lst_.includes(lastUserRes.toLowerCase())) ?
                      <div className={'response-box'} style={{cursor: "not-allowed"}}>
                        Small Talk Identified
                      </div>
                      :
                      <>
                        {(data?.length == 0) ?
                          <div
                            className={'response-box'}
                            style={{cursor: "not-allowed"}}
                          >
                            {/*{item}*/}
                            No match found for this data.
                          </div>
                          :
                          <>
                            {(data || []).map((item, index) => {
                              const cleanedItem = item.replace(/john\s*->\s*/i, "");
                              const payload = createPayload(
                                'Kustomer_PromptoGPT_Received_Response',
                                'Success'
                              );
                              let unique_uuid = generateUUID();
                              let response_received_LogMsg = 'Response_'+(index+1)+ ": "+ cleanedItem;
                              if (settingreg) {
                                logsAPI({ isAuthuu: isAuthuu, user_setting: settingreg, PAYLOAD_FOR_EVENT: payload, UUID: unique_uuid, log_message: response_received_LogMsg });
                              }
                              return (
                                <div
                                  key={index}
                                  className={'response-box'}
                                  onClick={() => copyFunc(cleanedItem, index)}
                                >
                                  {/*{item}*/}
                                  {cleanedItem}
                                  {(copied === index) && <span className={'copied-message'}>Copied</span>}
                                </div>

                              )
                            })}
                          </>
                        }
                      </>
                    }
                  </div>
                }
              </>
            )
          } catch (error) {
            console.log("Error in promptoGPTResponse:: ", error)
          }
        }

        async function loginBtnAPI() {
          setLoading(true);
          let endpoint = '/v1/commands/' + isAuthuu.appId + '.app.login_api/run';
          try {
            let resdata = await KustomerRequest({
              url: endpoint,
              method: 'POST',
              body: {
                "body": {
                  "email": isEmail
                }
              }
            },
              (err, response) => {
                if (err) {
                  console.log("Into 1")
                  return 'Failed to process return'
                } else if (response.responseBody.errors) {
                  console.log("Into 2")
                  return response.responseBody.errors.message;
                }
              }
            );
            let loginResponse = resdata?.data?.attributes?.responseBody;
            if (loginResponse?.status === true) {
              sessionStorage.setItem('isLoggedIn', true);
              setLoggedStatus(true);
              setApiCall(false)
              // settingResponse();
              settingBtnAPI()
            }
          } catch (err) {
              console.log("Error in loginBtnAPI::", err)
          }
        }
        async function settingBtnAPI() {
          setLoading(true)
          let endpoint = '/v1/commands/'+isAuthuu.appId+'.app.setting_api/run';
          try {
            let data = await KustomerRequest({
              url: endpoint,
              method: 'POST',
              body: {
                "headers": {
                  "X-ApiToken": "{{{authtoken}}}",
                  "X-ApiKey": "{{{apikey}}}",
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                "body": {
                  "email": isEmail
                }
              }
            },
              (err, response) => {
                if (err) {
                  console.log("Into 1")
                  setLoading(false);
                  return 'Failed to process return'
                } else if (response.responseBody.errors) {
                  console.log("Into 2")
                  return response.responseBody.errors.message;
                }
              }
            );
          let settingRes = data?.data?.attributes?.responseBody
          if (settingRes?.message === "Authentication failed ") {
            sessionStorage.setItem('settingStatus', false);
            setSettingStatus(false);
            setLoading(false);
          } else {
            sessionStorage.setItem('settingStatus', true);
            setSettingStatus(true);
            setSettingreg(settingRes);
            setLoading(false);
            const logMsg = "Successfully LoggedIn";
            const payload = createPayload(
              'Kustomer_LoggedIn',
              'Success'
            );
            await logsAPI({ isAuthuu: isAuthuu, user_setting: settingRes, PAYLOAD_FOR_EVENT: payload, log_message: logMsg });
            // const { authToken, clientAuthToken, model_type, usecase, promptoGPT_toggle, knowledgeAssist_toggle } = await generate_auth_client_token(settingRes, isEmail);
            const { authToken, clientAuthToken, model_type, usecase, promptoGPT_toggle, knowledgeAssist_toggle } = await generateTokenApi(settingRes, isEmail, isAuthuu);
            setGenerateToken(
              {
                authToken: authToken,
                client_authtoken: clientAuthToken,
                promptoGPT_toggle: promptoGPT_toggle,
                knowledgeAssist_toggle: knowledgeAssist_toggle,
                model_type: model_type,
                usecase: usecase
              }
            )
          }
          } catch (err) {
            console.log("Error in settingBtnAPI::", err)
          }
        }

        async function logoutBtn() {
          try {
            setLoading(false);
            sessionStorage.setItem('isLoggedIn', false);
            setLoggedStatus(false);
            setApiCall(false);
            sessionStorage.setItem('settingStatus', false);
            setSettingStatus(false);
            setCheckboxType('');
            setAutoLoading(false);
          } catch (err) {
              console.log("Error in logoutBtn::", err)
          }
        }

        async function copyFunc(text, index) {
          try {
            navigator.clipboard.writeText(text)
            .then(() => {
              setCopied(index);
              setTimeout(() => {
                setCopied(null)
              }, 1000); //Hide the "Copied" message after 2secs
            })
            .catch((err) => {
              console.log("Failed to copy::", err)
            });
          } catch (err) {
              console.log("Error in copy::", err)
          }
        }

        function checkboxContent() {
          try {
            return (            
              <div style={
                { 
                  display: "flex", 
                  gap: "15px", 
                  alignItems: "center",
                  border: "1px solid #808080",
                  borderRadius: "8px",
                  padding: "5px 10px"
                }
              }>
              {(generateToken?.promptoGPT_toggle) &&
                  <div style={{ ...divStyle }}>
                    <input
                      type="radio"
                      id="promptogpt"
                      name="preference_type"
                      value={"promptogpt"}
                      onClick={(e) => selectedCheckbox(e?.target?.value)}
                      disabled={((lastUserRes === 'Agent') || (channelType === "email"))?true:false}
                      className={(lastUserRes === 'Agent')?'cursor':''}
                    />
                    <label for="promptogpt">
                      <span
                        // className={gradient_text}
                        style={{
                          color: 'transparent',
                          background: "linear-gradient(to left, rgb(220, 7, 213), rgb(6, 6, 192), rgb(161, 161, 5), rgb(153, 8, 220))",
                          WebkitBackgroundClip: "text",
                          fontWeight: "600",
                          fontSize: "16px",
                          fontFamily: "poppins"
                        }}
                      >
                        PromptAI
                      </span>
                    </label>
                  </div>
                }
                {(generateToken?.knowledgeAssist_toggle) &&
                  <div style={divStyle}>
                    <input
                      type="radio"
                      id="knowledge_assist"
                      name="preference_type"
                      value={"knowledge_assist"}
                      onClick={(e) => selectedCheckbox(e?.target?.value)}
                    />
                    <label for="knowledge_assist">
                      <span
                        // className={gradient_text}
                        style={{
                          color: 'transparent',
                          background: "linear-gradient(to left, rgb(220, 7, 213), rgb(6, 6, 192), rgb(161, 161, 5), rgb(153, 8, 220))",
                          WebkitBackgroundClip: "text",
                          fontWeight: "600",
                          fontSize: "16px",
                          fontFamily: "poppins"
                        }}
                      >
                        AssistAI
                      </span>
                    </label>
                  </div>
                }
              </div>           
            )
          } catch (err) {
            console.log("Error in checkboxContent::", err);
          }
        }

        const dashboardComponent = () => {
          let url=isAuthuu?.url_def;
          let token = generateToken?.client_authtoken;
          let end_url='&email='+isEmail+'&clientType=extension';
          let last_url=url+token+end_url;
          return (
            //<div style={{ padding: '15px' }}>
            <div style={{ padding: '0px' }}>
              {/*<img src='/images/logo.svg' /> TaskGPT*/}
              <div style={{
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div
                  style={{ 
                    ...common_style,
                    margin: "10px 0px",
                    fontWeight: "500"
                  }}
                >
                  Welcome, <span style={{ fontWeight: "600" }}>{name}</span>
                </div>
                <div style={{
                  textDecoration: "underline",
                  fontSize: "15px",
                  fontFamily: "Poppins",
                  color: "#005EFF",
                  cursor: "pointer",
                  }}
                  onClick={() => logoutBtn()}
                >
                  Logout
                </div>
              </div>
              
              {checkboxContent()}
              <>
                {(ischeckboxType == 'promptogpt') ?
                  <>
                    {(lastUserRes !== "Agent") ?  promptoGPTResponse()  : <></>}
                  </>
                  :
                  ((ischeckboxType == 'knowledge_assist') ?
                      // (generateToken?.client_authtoken) &&
                    <div style={{ margin: "10px 0px 0px" }}>
                      
                      <iframe
                        id="taskgpt"
                        src={last_url}
                        // allow = "clipboard-read; clipboard-write"
                        style={{
                          height: '453px',
                          width: "100%"
                        }}                  
                      >

                      </iframe>

                    </div>
                    :
                    <></>
                  )
                }
              </>
            </div >
          )
        }      

        const loginComponent = () => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: "12px 0px 0px"}}>
              <div>
                <div 
                  style={{
                    margin: "0px 0px 10px",
                    fontFamily: "poppins",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#282829"
                  }}
                >
                  Email
                </div>
                <input
                  style={
                    {
                      padding: '10px',
                      border: '1px solid #B3B3B3',
                      background: '#FFFFFF',
                      borderRadius: '8px',
                      color: '#808080',
                      fontFamily: 'Poppins',
                      fontSize: '16px',
                      width: '100%',
                      outline: 'none'
                    }
                  }
                  id="email_id"
                  value={isEmail}
                  readOnly
                />
              </div>
              {!(isLoading) ?
                <button
                  style={{
                    padding: "12px 48px",
                    borderRadius: "40px",
                    background: " #005EFF",
                    color: "#FFFFFF",
                    border: "1px solid #005EFF",
                    margin: "21px 0px 11px",
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                  onClick={() => loginBtnAPI()}
                >
                  Login
                </button>
                :
                <button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    alignItems: "center",
                    padding: "12px 48px",
                    borderRadius: "40px",
                    background: " #005EFF",
                    color: "#FFFFFF",
                    border: "1px solid #005EFF",
                    margin: "21px 0px 11px",
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    cursor: 'not-allowed'
                  }}
                  disabled
                >
                  <span className={'loader'}></span>  Loading...
                </button>

              }
            </div >
          )
        }

        const footerPart = () => {
          const currentYear = new Date().getFullYear();
          return (
            <div style={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "poppins",
              margin: "10px 0px",
              textAlign: "center",
              color: "#000000"
              }}
            >
              <p>Version: 1.0.0 | TaskUs @ {currentYear} | <a style={{color: "#005EFF", textDecoration: "underline"}} href="https://www.taskus.com/security/" target="_blank">Security</a></p>
            </div>
          )
        }

        return (
          // <div style={{padding: "10px"}}>
          <div style={{padding: "5px"}}>
            {(!(isSettingStatus)) && loginComponent()}
            {((isLoggedStatus) && (isSettingStatus)) && dashboardComponent()}
            {footerPart()}
            <style>{${styleSection}}</style>
          </div>
        )
      });
    <MyComponent 
      conversation={conversation}
      appSettings={appSettings}
    />     
    
    }
    
    
  `,
  context: 'smartbar-card',
  resource: 'conversation',
  meta: {
    displayName: 'TaskGPT',
    icon: 'earth',
    state: 'open'
  }
}

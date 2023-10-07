const _config =  {
  url: "http://localhost:8080/",
  workingObject: {},
}

window.onload = ()=>{
  checkURL()
}

function checkURL() {
  const hash = window.location.hash
  const clientURL = window.location.origin + window.location.pathname
  if ( 
    clientURL === "" // * Add an allowed client url here. Example: "https://robbobfrh84.github.io/palm-ai-app/" 
    || clientURL === "" // * Add an allowed client url here. Example: https://colorai.farm/"
    || hash === "#prod") // * for testing, force testing the produstion url. 
  {
    _config.url = "" // * Add your live server url here. Example: "https://palm-ai-app.uw.r.appspot.com/"
  }
}

/* 👉 * * * * Responses * * * * 👉 */
function createObjectResponse(data) {
  console.log('data:', data)
  _config.workingObject = data
  responseObjTextArea.innerHTML = JSON.stringify(data,null,2)
}

function createImageResponse(data) {
  console.log('data:', data)
  promptImageDiv.innerHTML = /*html*/`
    <img id="testImage" width="400" src="${data.response}">
  `
}

function createImageObjectResponse(data) {
  console.log('data:', data)
  promptObjectImageDiv.innerHTML = /*html*/`
    <img id="testImage" width="400" src="${data.response}">
  `
}


/* ⏺️ * * * * Triggers * * * * ⏺️ */
function createObject() {
  createObjectAPI(themeInput.value)
}

function createImage() {
  createImageAPI(imagePromptInput.value)
}

function createObjectImage() {
  console.log('_config.workingObject:',_config.workingObject)
  createObjectImageAPI({
    theme: _config.workingObject.query.theme,
    object: JSON.stringify(_config.workingObject.response)
  })
}


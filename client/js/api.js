/* - - - - - API - - - - - */ 
function createObjectAPI(theme) {

    const urlString = _config.url+"create_object?"+(new URLSearchParams({
      theme: theme,
      limit_fields: 10
    })).toString()

    // 🔥 DRY REFACTOR 👇
    fetch(urlString) 
      .then( res => res.json())
      .then( data => {
        createObjectResponse(data)
      })
      .catch( error => { 
        console.log('🚨 error:', error) // * error needs to log to show any code error after this point. 
      }) // * .finally( ()=> ... )

}

function createImageAPI(prompt) {

  const urlString = _config.url+"create_image?"+(new URLSearchParams({
    prompt: prompt,
  })).toString()

  // 🔥 DRY REFACTOR 👇
  fetch(urlString)
    .then( res => res.json())
    .then( data => {
      createImageResponse(data)
    })
    .catch( error => { 
      console.log('🚨 error:', error) // * error needs to log to show any code error after this point. 
    }) // * .finally( ()=> ... )

}

function createObjectImageAPI({ theme, object }) {

  const urlString = _config.url+"create_object_image?"+(new URLSearchParams({
    theme: theme,
    object: object,
  })).toString()

  // 🔥 DRY REFACTOR 👇
  fetch(urlString)
    .then( res => res.json())
    .then( data => {
      createImageObjectResponse(data)
    })
    .catch( error => { 
      console.log('🚨 error:', error) // * error needs to log to show any code error after this point. 
    }) // * .finally( ()=> ... )

}
const { Configuration, OpenAIApi } = require("openai")
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const ai = {
  

  create_object: async function({ theme, limit_fields }) {

    const prompt = `
      Create a JSON object
      - Use the term "${theme}" as a theme. This should not be included in the object.
      - Add the fields "name" and give it a value associated with the theme.
      - Add the field "age" and give it a value associated with the theme.
      - Add the field "appearance" and give it a value of a description of it doing something.
      - Add 5 more fields and values that would associate with this theme.
      - limited to ${limit_fields} fields.
      - response must ONLY be as a JSON object.
    `
  
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 256,
    });

    console.log('response.data.choices[0]:',response.data.choices[0])
  
    return JSON.parse(response.data.choices[0].text)
  },

  
  create_image: async function({ prompt }) {
  
    const response = await openai.createImage({ // * Resource: https://platform.openai.com/docs/guides/images/usage
      prompt: prompt,
      n: 1,
      size: "256x256", // * Limited to: 256x256, 512x512, 1024x1024 
    });
    image_url = response.data.data[0].url;
  
    console.log('image_url:',image_url)
    return image_url
  
  },

  create_object_image: async function({ theme, object }) {
    console.log('\n🔥',theme, object)
    console.log('JSON.parse(object).appearance:',JSON.parse(object).appearance)

    // prompt = `
    //   Use the details from following JSON object to create and image of a ${theme}.
    //   - ${JSON.stringify(object).split('\\').join('')}
    // `

    prompt = `
      Use the following details to create and image of a ${theme}.
      - ${JSON.parse(object).appearance}
      - Use a cartoon style.
    `

    console.log('prompt:',prompt)
  
    const response = await openai.createImage({ // * Resource: https://platform.openai.com/docs/guides/images/usage
      prompt: prompt,
      n: 1,
      size: "256x256", // * Limited to: 256x256, 512x512, 1024x1024 
    });
    image_url = response.data.data[0].url;
  
    console.log('image_url:',image_url)
    return image_url
  
  },


}


module.exports = { ai }








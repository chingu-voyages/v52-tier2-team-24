import axios from "axios";

const client = axios.create({baseURL: 'https://la-active-addresses.s3.us-east-2.amazonaws.com'})

export const request = ({...options}) => {
  const onSuccess = response => response
  const onError = error => {

    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
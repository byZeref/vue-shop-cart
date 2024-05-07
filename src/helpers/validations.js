import { notify } from '@/helpers/notify'
import { NOTIFICATION, MESSAGES, API_ERRORS } from '@/utils/constants'
const { NOTIFY_ERROR } = NOTIFICATION
const { MSG_ERROR_LOGIN, MSG_ERROR_INTERNET } = MESSAGES
const { INVALID_CREDENTIALS, INTERNET_CONECTION } = API_ERRORS

let STATUS
let MESSAGE

export const handleError = (error) => {
  const { status, message } = error
  STATUS = status
  MESSAGE = message
  let MSG

  if (isInternetError()) MSG = MSG_ERROR_INTERNET
  else if (isLoginError()) MSG = MSG_ERROR_LOGIN

  notify(NOTIFY_ERROR, MSG)
}

const isInternetError = () => STATUS === 0 && MESSAGE === INTERNET_CONECTION
const isLoginError = () => STATUS === 400 && MESSAGE === INVALID_CREDENTIALS
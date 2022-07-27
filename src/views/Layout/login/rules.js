export const usernameRules = [
  { required: true, message: '请输入账号' },
  {
    pattern: /^[a-zA-Z0-9]{5,8}$/,
    message: '账号格式错误',
    trigger: 'onChange'
  }
]
export const passwordRules = [
  { required: true, message: '请输入密码' },
  {
    pattern: /^[a-zA-Z0-9]{5,12}$/,
    message: '账号格式错误',
    trigger: 'onChange'
  }
]

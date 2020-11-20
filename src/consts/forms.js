export const DISPLAY = {
  INPUT: "INPUT",
  INPUT_PASSWORD: "INPUT_PASSWORD",
  SELECT: "SELECT",
  DATEPICKER: "DATEPICKER",
}

export const login = {
  login: {
    type: "string",
    required: true,
    message: "Hãy nhập tên đăng nhập!",
    display: {
      type: DISPLAY.INPUT,
      label: "Tên đăng nhập"
    }
  },
  password: {
    type: "string",
    required: true,
    message: "Hãy nhập mật khẩu!",
    display: {
      type: DISPLAY.INPUT_PASSWORD,
      label: "Mật khẩu"
    }
  }
}
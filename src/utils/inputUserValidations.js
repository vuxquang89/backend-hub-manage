export const phone_validation = {
  name: "phone",
  label: "Số điện thoại",
  type: "text",
  id: "phone",
  placeholder: "Số điện thoại",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    pattern: {
      value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      message: "Không đúng định dạng SĐT",
    },
  },
};

export const email_validation = {
  name: "email",
  label: "Email",
  type: "email",
  id: "email",
  placeholder: "Email",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Không đúng định dạng Email",
    },
  },
};

export const password_validation = {
  name: "password",
  label: "Mật khẩu",
  type: "password",
  id: "password",
  placeholder: "Mật khẩu",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 30,
      message: "Tối đa 30 ký tự",
    },
    minLength: {
      value: 5,
      message: "Tối thiểu 5 ký tự",
    },
    pattern: {
      value: new RegExp(/^[a-zA-Z0-9]*$/),
      message: "Không nhập khoảng trắng hoặc ký tự đặc biệt",
    },
  },
};

export const username_validation = {
  name: "username",
  label: "Tên đăng nhập",
  type: "text",
  id: "username",
  placeholder: "Tên đăng nhập",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 15,
      message: "Tối đa 15 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
    pattern: {
      value: new RegExp(/^[a-zA-Z0-9]*$/),
      message: "Không nhập khoảng trắng hoặc ký tự đặc biệt",
    },
  },
};

export const fullname_validation = {
  name: "fullname",
  label: "Họ tên",
  type: "text",
  id: "fullname",
  placeholder: "Họ tên",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 30,
      message: "Tối đa 15 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

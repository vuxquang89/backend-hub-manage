export const deviceName_validation = {
  name: "deviceName",
  type: "text",
  id: "deviceName",
  placeholder: "Tên thiết bị *",
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
  },
};

export const add_deviceName_validation = {
  name: "deviceName",
  label: "Tên thiết bị",
  type: "text",
  id: "deviceName",
  placeholder: "Tên thiết bị",
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
  },
};

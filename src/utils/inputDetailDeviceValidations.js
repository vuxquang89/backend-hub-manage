export const device_trademark_validation = {
  name: "trademark",
  label: "Thương hiệu",
  type: "text",
  id: "trademark",
  placeholder: "Thương hiệu",
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
  },
};

export const device_ratedPower_validation = {
  name: "ratedPower",
  label: "Công suất định mức (KVA)",
  type: "number",
  id: "ratedPower",

  placeholder: "Công suất định mức (KVA)",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
  },
};

export const hubName_validation = {
  name: "hubName",
  label: "Tên phòng máy",
  tickValidation: "*",
  type: "text",
  id: "hubName",
  placeholder: "Tên phòng máy",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 50,
      message: "Tối đa 50 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

export const hubCode_validation = {
  name: "hubId",
  label: "Mã Hub",
  type: "text",
  id: "hubId",
  placeholder: "Mã Hub",
  tickValidation: "*",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 50,
      message: "Tối đa 50 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

export const hubAddress_validation = {
  name: "hubAddress",
  tickValidation: "*",
  label: "Địa chỉ",
  type: "text",
  id: "hubAddress",
  placeholder: "Địa chỉ *",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 60,
      message: "Tối đa 60 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

export const hubCity_validation = {
  name: "hubCity",
  tickValidation: "*",
  label: "Tỉnh/Thành phố",
  type: "text",
  id: "hubCity",
  placeholder: "Tỉnh/Thành phố",
  validation: {
    required: {
      value: true,
      message: "Không được để trống",
    },
    maxLength: {
      value: 20,
      message: "Tối đa 20 ký tự",
    },
    minLength: {
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

export const hubManager_validation = {
  name: "hubManagerName",
  type: "text",
  tickValidation: "*",
  label: "Quản lý PM",
  id: "hubManagerName",
  placeholder: "Quản lý PM",
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
      value: 2,
      message: "Tối thiểu 2 ký tự",
    },
  },
};

export const phone_validation = {
  name: "hubManagerPhone",
  type: "text",
  tickValidation: "*",
  label: "Số điện thoại",
  id: "hubManagerPhone",
  placeholder: "Số điện thoại",
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

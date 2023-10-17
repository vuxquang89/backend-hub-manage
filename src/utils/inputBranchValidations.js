export const name_branch_validation = {
  name: "nameBranch",
  label: "Tên Chi Nhánh",
  type: "text",
  id: "nameBranch",
  placeholder: "Tên Chi Nhánh",
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

export const code_branch_validation = {
  name: "branchId",
  label: "Mã chi nhánh",
  type: "text",
  id: "branchId",
  placeholder: "Mã chi nhánh",
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

export const address_branch_validation = {
  name: "branchAddress",
  label: "Địa chỉ chi nhánh",
  type: "text",
  placeholder: "Địa chỉ chi nhánh",
  id: "branchAddress",
};

export const name_validation = {
  name: "deputyTechnicalDirector",
  label: "PGĐ KT",
  type: "text",
  id: "deputyTechnicalDirector",
  placeholder: "PGĐ KT",
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

export const phone_validation = {
  name: "phoneDeputyTechnicalDirector",
  label: "Số điện thoại",
  type: "text",
  id: "phoneDeputyTechnicalDirector",
  placeholder: "SĐT PGĐ KT",
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
  label: "email address",
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

const formProps = [
    {
      title: "Họ và tên",
      name: "username",
      id: "username",
      type: "text",
      placeholder: "Nhập họ và tên...",
      rules: "required",
      text: "tên",
    },
    {
      title: "Địa chỉ email",
      name: "email",
      id: "email",
      type: "text",
      placeholder: "Nhập email ...",
      rules: "required|email",
      text: "email",
    },
    {
      title: "Mật khẩu",
      name: "password",
      id: "password",
      type: "password",
      placeholder: "Nhập mật khẩu ...",
      rules: "required|min:6",
      text: "mật khẩu",
    },
  ];
  export default formProps
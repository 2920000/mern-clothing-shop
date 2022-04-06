const formProps = [
    {
      title: "Email",
      name: "email",
      id: "email",
      type: "text",
      placeholder: "Nhập email...",
      rules: "required|email",
      text: "email",
    },
    {
      title: "Mật khẩu",
      name: "password",
      id: "password",
      type: "password",
      placeholder: "Nhập password...",
      rules: "required|min:6",
      text: "mật khẩu",
    },
  ];

  export default formProps
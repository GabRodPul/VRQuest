import React, { useState } from 'react';
import { Button, Form, Input, Alert, Space } from 'antd';

type ErrorMessage = {
  name: string;
  message: string;
}

type ErrorResponse = {
  code: number,
  msg: string
}

type LoginForm = {
  username: string,
  password: string
}

function LoginPage() {
  const [loginFailed, setLoginFailed] = useState<ErrorResponse>();

  const onFinish = async (values: LoginForm) => {
    setLoginFailed(undefined)
    const res = await fetch("http://localhost:8080/api/players/login/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(values),
      // headers {
      //     "Content-Type": "application/json"
      // },
    })

    const data = await res.json();
    console.log(data)
    if (data.code !== undefined) {
      setLoginFailed(data as ErrorResponse);
    } else {
      window.localStorage.setItem("access_token", data.access_token);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const alertFailure = () => {
    if (loginFailed) return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      </Space>
    )
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, min: 4, max: 32, message: 'Invalid username: must be between 4 and 32 chars' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, min: 8, max: 256, message: 'Invalid password: must be between 8 and 32 chars' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {alertFailure}
    </>
  );
};

export default LoginPage
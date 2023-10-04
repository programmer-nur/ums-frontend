/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Form from "@/app/components/Forms/Form";
import FormInput from "@/app/components/Forms/FormInput";
import UMBradCrumb from "@/app/components/ui/UMBredCrumb";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

const CreateDepartmentPage = () => {
 

  const onSubmit = async (data: any) => {
    const [addDepartment]=useAddDepartmentMutation()
    message.loading("Creating.....");
    try {
      console.log(data);
     addDepartment(data)
      message.success("Department added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "super_admin";
  return (
    <div>
      <UMBradCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "department", link: `/${base}/department` },
        ]}
      />
      <h1>Create Department</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
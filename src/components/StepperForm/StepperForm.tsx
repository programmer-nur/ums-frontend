import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";

interface FormConfig {
  resolver?:any
}
type ISteps= {
  steps: {
    title: string;
    content: React.ReactElement | React.ReactNode;
  }[];
  submitHandler: SubmitHandler<any>;
  navigateLink?:string
} & FormConfig;

const StepperForm = ({ steps, submitHandler,navigateLink,resolver }: ISteps) => {
const router = useRouter()
  const formConfig: FormConfig = {};  
  if (!!resolver) formConfig["resolver"] = resolver;

  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage('step') ? Number(JSON.parse(getFromLocalStorage('step') as string).step):0
  );

  useEffect(()=>{
setToLocalStorage('step',JSON.stringify({step:current}))
  },[current])


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm<FormConfig>(formConfig);
  const { handleSubmit, reset } = methods;

  const handelStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset()
    setToLocalStorage('step',JSON.stringify({step:0}))
    navigateLink && router.push(navigateLink)
  };
  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(handelStudentOnSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;

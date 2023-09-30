'use client'

import ActionBar from "@/app/components/ui/ActionBar";
import UMBradCrumb from "@/app/components/ui/UMBredCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ManageDepartment = () => {
    const { role } = getUserInfo() as any;
  return (
    <div>
        <UMBradCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          }
        ]}
      />    
        <ActionBar title="Department list"><Link href='/super_admin/department/create'>
        <Button type="primary">Create Student</Button>
        </Link></ActionBar>
    </div>
  );
};
export default ManageDepartment;
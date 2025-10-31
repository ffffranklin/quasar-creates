import {Metadata} from "next";
import {SiteLayout} from "@/components/site-layout";
import {EditForm} from "@/app/edit/product/[id]/_components/edit-form";

export const metadata: Metadata = {
  title: 'Edit Product Page',
  description: ' Edit individual product profile and add photos',
};

export default async function EditProductPage() {
  return (
    <SiteLayout>
      <EditForm />
    </SiteLayout>
  )
}



import {Metadata} from "next";
import {SiteLayout} from "@/components/site-layout";
import {EditProductForm} from "@/app/edit/product/[id]/_components/edit-product-form";

export const metadata: Metadata = {
  title: 'Edit Product Page',
  description: ' Edit individual product profile and add photos',
};

export default async function EditProductPage() {
  return (
    <SiteLayout>
      <EditProductForm />
    </SiteLayout>
  )
}



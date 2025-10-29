import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";

interface ItemProps {
  imageUrl: string,
  title: string,
  price: string
}

function Item({imageUrl, title, price}: PropsWithChildren<ItemProps>) {
  return (
    <Card>
      <CardContent>
        <img width="300" src={imageUrl || 'https://i.imgur.com/CnhiMyx.jpeg'} />
      </CardContent>
      <CardFooter>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>{ price }</CardDescription>
      </CardFooter>
    </Card>
  )
}

export { Item }

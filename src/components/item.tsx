import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface ItemProps {
  imageUrl: string,
  title: string,
  price: string
}

function Item({imageUrl, title, price}: ItemProps) {
  return (
    <Card>
      <CardContent>
        <img width="300" src={imageUrl} />
      </CardContent>
      <CardHeader>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>{ price }</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { Item }

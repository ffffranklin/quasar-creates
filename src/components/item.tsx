import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface ItemProps {
  imageUrl: string,
  title: string,
  price: string
}

function Item({imageUrl, title, price}: ItemProps) {
  return (
    <Card className="w-full lg:w-90 h-min flex-none mb-4">
      <CardContent className="overflow-hidden">
        <img src={imageUrl} />
      </CardContent>
      <CardHeader>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>{ price }</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { Item }

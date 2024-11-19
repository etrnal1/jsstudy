import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export function PostCard({ title, excerpt, date, slug }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{date}</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
} 
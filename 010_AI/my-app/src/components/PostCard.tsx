import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { type Post } from "@/data/posts"
interface PostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export function PostCard({ title, description, date, tags }: Post) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <time className="text-sm text-muted-foreground">{date}</time>
        {tags && (
          <div className="flex gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
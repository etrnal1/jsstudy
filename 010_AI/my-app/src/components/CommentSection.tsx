"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  likes: number
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "张三",
      content: "写得很好，学习了！",
      date: "2024-03-20",
      likes: 5
    }
  ])
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      author: "访客用户",
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">评论 ({comments.length})</h2>
      
      {/* 评论输入框 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="写下你的评论..."
          className="mb-4"
        />
        <Button type="submit">发表评论</Button>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${comment.author}`} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-sm text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                <span>{comment.likes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
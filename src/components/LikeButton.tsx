"use client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"

export function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)

  const handleLike = () => {
    setLiked(!liked)
    setCount(prev => liked ? prev - 1 : prev + 1)
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLike}
      className={`gap-2 ${liked ? 'text-red-500' : ''}`}
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
      <span>{count}</span>
    </Button>
  )
} 
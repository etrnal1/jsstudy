"use client"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ShareButton() {
  const shareUrls = {
    weibo: (url: string, title: string) =>
      `http://service.weibo.com/share/share.php?url=${url}&title=${title}`,
    twitter: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    window.open(shareUrls[platform as keyof typeof shareUrls](url, title))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="w-5 h-5" />
          <span>分享</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleShare('weibo')}>
          分享到微博
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          分享到Twitter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
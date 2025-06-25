
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

export function ButtonWithPlusIcon() {
  return (
    <Button variant="default" size="sm">
      <Download /> Download Resume
    </Button>
  )
}
export function ButtonWithShareIcon() {
  return (
    <Button variant="outline" size="sm">
      <Share2 /> Share Resume
    </Button>
  )
}

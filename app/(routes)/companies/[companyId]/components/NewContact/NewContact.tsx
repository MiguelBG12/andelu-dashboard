"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

export function NewContact() {
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>Add new contact</Button>
        </DialogTrigger>
    </Dialog>
  )
}

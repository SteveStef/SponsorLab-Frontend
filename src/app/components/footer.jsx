/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5Kg3o6Cx2kr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="py-6 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>&copy; 2024 SponsorLab Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Separator orientation="vertical" />
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

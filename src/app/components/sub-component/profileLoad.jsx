
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function ListingLoad() {
  return (
    <Link href="#">
      <Card
        className="bg-muted animate-pulse rounded bg-background p-4 rounded-lg shadow-md hover:bg-muted transition-colors "
      >
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={""} alt={"Hello"} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold bg-muted animate-pulse rounded mb-2" style={{ height: "20px" }}></h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="w-4 h-4" />
              Subscribers
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              Avg Views
            </div>
            {false && (
              <div className="mt-2 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-md text-xs font-medium">
                Needs Sponsor
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
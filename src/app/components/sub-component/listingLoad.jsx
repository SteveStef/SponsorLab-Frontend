import Image from "next/image";
export default function ListingLoad() {
  return (
    <div className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
        <Image
          alt=" Loading..."
          className="bg-muted animate-pulse rounded w-full h-full object-cover"
          width="576"
          height="284"
          style={{ aspectRatio: "576/284", objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">
            <EyeIcon className="animate-pulse w-4 h-4 inline-block mr-1" />
            <span className="animate-pulse rounded mb-2">views</span>
          </div>
          <div className="flex items-center gap-1 animate-pulse rounded mb-2">
            <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
          </div>
        </div>
        <h3 className="bg-muted animate-pulse rounded mb-2" style={{ height: "20px" }}></h3>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <CalendarIcon className="animate-pulse rounded w-4 h-4 inline-block mr-1" />
            <span className="bg-muted animate-pulse rounded mb-2" style={{ height: "20px" }}></span>
          </div>
          <div className="animate-pulse rounded mb-2" style={{ height: "20px" }}>$0.00</div>
        </div>
      </div>
    </div>
  )
}
function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
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


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

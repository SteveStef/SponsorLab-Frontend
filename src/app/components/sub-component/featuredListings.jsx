import Image from "next/image";
import ListingsLoad from "./listingLoad";

export default function FeaturedListings() {
  const featuredPosts = [];
  return (
    <>
      {
        featuredPosts.length === 0 && ['','',''].map((_, idx) => {
          return <ListingsLoad key={idx} />
        })
      }

      {featuredPosts.map((post) => (
        <Link key={post.id} href={`./listings/${post.id}`}>
          <div className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
              <Image
                src={"/place.png"}
                alt="Post Thumbnail"
                className="w-full h-full object-cover"
                width="576"
                height="284"
                style={{ aspectRatio: "576/284", objectFit: "cover" }}
              />
              <div className="absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
                Tech
              </div>
              <div className="absolute bottom-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
                Available
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">
                  <EyeIcon className="w-4 h-4 inline-block mr-1" />
                  50K views
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Mastering the Latest AI Trends</h3>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                  November 20, 2023
                </div>
                <div className="text-primary font-semibold">$29.99</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
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

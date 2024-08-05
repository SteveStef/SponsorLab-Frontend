/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WZWdYxiHhlz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Image from "next/image"
import Link from "next/link"
import Header from "./nav";
import Footer from "./footer";
import cuphead from "../../../public/headcup.jpg"

export default function Landing() {
  return (
    <div className="flex flex-col">
      <Header />
      <br></br>
      <br></br>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:leading-tighter xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Unleash Your Digital Potential
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Discover innovative solutions that drive your business forward.
            </p>
          </div>
          <Image
            src={cuphead}
            width={800}
            height={450}
            alt="Hero Image"
            className="mx-auto aspect-[16/9] overflow-hidden rounded-xl object-cover"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <Image
            src={cuphead}
            width={800}
            height={450}
            alt="About Us"
            className="mx-auto aspect-[16/9] overflow-hidden rounded-xl object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our Company</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We are a team of passionate innovators dedicated to empowering businesses with cutting-edge digital
              solutions. Our mission is to help our clients achieve their goals and unlock new opportunities in the
              ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-8">
          <div className="grid gap-4">
            <Image
              src={cuphead}
              width={400}
              height={225}
              alt="Blog Post 1"
              className="aspect-[16/9] overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Revolutionizing the Digital Landscape</h3>
              <p className="text-muted-foreground">By John Doe</p>
            </div>
          </div>
          <div className="grid gap-4">
            <Image
              src={cuphead}
              width={400}
              height={225}
              alt="Blog Post 2"
              className="aspect-[16/9] overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Unlocking the Power of Digital Transformation</h3>
              <p className="text-muted-foreground">By Jane Smith</p>
            </div>
          </div>
          <div className="grid gap-4">
            <Image
              src={cuphead}
              width={400}
              height={225}
              alt="Blog Post 3"
              className="aspect-[16/9] overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Navigating the Digital Frontier</h3>
              <p className="text-muted-foreground">By Michael Johnson</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
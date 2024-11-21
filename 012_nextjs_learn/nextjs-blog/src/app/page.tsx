import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The king, seeing how much happier his subjects were, realized the error of
            his ways and repealed the joke tax.
          </p>
        </section>

        {/* Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 1</h3>
            <p className="text-gray-600">Content for column 1</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 2</h3>
            <p className="text-gray-600">Content for column 2</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Column 3</h3>
            <p className="text-gray-600">Content for column 3</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mb-16">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6 border-b pb-2">
            天国的人民
          </h2>
          <blockquote className="my-6 border-l-2 pl-6 italic text-gray-700 bg-gray-50 p-4 rounded-r-lg">
            "After all," he said, "everyone enjoys a good joke, so it's only fair that
            they should pay for the privilege."
          </blockquote>
        </section>

        {/* Action Section */}
        <section className="flex items-center gap-4">
          <Link 
            href="/pages/posts"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            查看文章
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            Click me
          </Button>
        </section>
      </div>
    </main>
  );
}

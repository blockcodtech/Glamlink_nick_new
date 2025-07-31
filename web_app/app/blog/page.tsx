import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Beauty: Transforming the Industry",
      excerpt: "Discover how artificial intelligence is revolutionizing beauty consultations, product recommendations, and personalized treatments.",
      category: "Technology",
      author: "Sarah Chen",
      date: "March 15, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "Building Your Beauty Brand: A Complete Guide",
      excerpt: "Step-by-step guide to launching and growing your beauty brand on Glamlink, from setup to scaling your business.",
      category: "Business",
      author: "Michael Rodriguez",
      date: "March 12, 2025",
      readTime: "8 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "Top 10 Skincare Trends for 2025",
      excerpt: "Expert insights on the latest skincare innovations, ingredients, and treatments that are shaping the beauty industry.",
      category: "Trends",
      author: "Dr. Emily Watson",
      date: "March 10, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "How to Choose the Right Beauty Professional",
      excerpt: "Tips for finding certified beauty professionals who match your needs, budget, and aesthetic preferences.",
      category: "Tips",
      author: "Jessica Park",
      date: "March 8, 2025",
      readTime: "4 min read",
      image: "/api/placeholder/800/400"
    }
  ];

  const categories = ["All", "Technology", "Business", "Trends", "Tips", "Tutorials"];

  return (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Glamlink Blog
              </h1>
              <p className="text-xl text-gray-600">
                Insights, tips, and trends from the world of beauty and technology
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-gray-200">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category === "All"
                      ? "bg-glamlink-teal text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="aspect-[2/1] relative bg-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-glamlink-teal/20 to-cyan-500/20"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-glamlink-teal transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{post.author}</p>
                          <p className="text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get the latest beauty trends, business tips, and Glamlink updates delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-glamlink-teal"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-glamlink-teal text-white font-semibold rounded-full hover:bg-glamlink-teal-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-8 bg-blue-50">
          <div className="container-custom">
            <div className="text-center">
              <p className="text-blue-800">
                <span className="font-semibold">Coming Soon:</span> Full blog functionality with articles, 
                comments, and search. For now, explore our{" "}
                <Link href="/brand" className="underline hover:text-blue-900">
                  brand directory
                </Link>{" "}
                for beauty inspiration!
              </p>
            </div>
          </div>
        </section>
    </div>
  );
}
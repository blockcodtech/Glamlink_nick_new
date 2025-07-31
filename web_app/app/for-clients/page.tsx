import Link from "next/link";
import Image from "next/image";

export default function ForClientsPage() {
  const features = [
    {
      title: "Discover Trusted Brands",
      description: "Browse through our curated collection of beauty brands, each verified and quality-assured.",
      icon: "🌟"
    },
    {
      title: "Find Certified Professionals",
      description: "Connect with certified beauty professionals rated by real clients in your area.",
      icon: "👩‍🎨"
    },
    {
      title: "AI Beauty Analysis",
      description: "Get personalized skincare and beauty recommendations with our free AI analysis tool.",
      icon: "🤖"
    },
    {
      title: "Real Reviews",
      description: "Read authentic reviews from verified customers to make informed decisions.",
      icon: "💬"
    },
    {
      title: "Before & After Gallery",
      description: "See real transformation results from treatments and products.",
      icon: "✨"
    },
    {
      title: "Book with Confidence",
      description: "Easy booking system with secure payments and satisfaction guarantee.",
      icon: "📅"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Browse or Search",
      description: "Explore brands, products, or find professionals based on your needs"
    },
    {
      number: "2",
      title: "Compare & Choose",
      description: "Read reviews, check ratings, and compare options to find your perfect match"
    },
    {
      number: "3",
      title: "Book or Purchase",
      description: "Schedule appointments or buy products directly through the platform"
    },
    {
      number: "4",
      title: "Enjoy & Review",
      description: "Experience great service and share your feedback to help others"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Your Beauty Journey Starts Here
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Discover trusted beauty brands, certified professionals, and personalized 
                    recommendations all in one place. Glamlink makes finding the perfect 
                    beauty solutions simple and safe.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/brand"
                      className="px-8 py-3 bg-glamlink-teal text-white font-semibold rounded-full hover:bg-glamlink-teal-dark transition-colors text-center"
                    >
                      Browse Brands
                    </Link>
                    <Link
                      href="/image-analysis"
                      className="px-8 py-3 bg-white text-glamlink-teal font-semibold rounded-full border-2 border-glamlink-teal hover:bg-gray-50 transition-colors text-center"
                    >
                      Try AI Analysis
                    </Link>
                  </div>
                </div>
                <div className="relative h-96 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-glamlink-teal/20 to-cyan-500/20 rounded-2xl"></div>
                  <div className="absolute inset-4 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <p className="text-gray-600 text-lg">Beauty Services Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Everything You Need for Beauty Success
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                How Glamlink Works for You
              </h2>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-glamlink-teal text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                      {index < steps.length - 1 && (
                        <div className="mt-8 ml-6 w-px h-8 bg-gray-300"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">
                What Our Clients Say
              </h2>
              <div className="bg-gradient-to-br from-glamlink-teal/10 to-cyan-50 rounded-2xl p-8 md:p-12">
                <svg
                  className="w-12 h-12 text-glamlink-teal mx-auto mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  "Glamlink has completely transformed how I find beauty services. 
                  The AI analysis gave me personalized recommendations that actually work, 
                  and I love being able to read real reviews before booking appointments."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600">Glamlink Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-glamlink-teal to-cyan-600">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Discover Your Perfect Beauty Match?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of satisfied clients who've found their beauty solutions on Glamlink.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-white text-glamlink-teal font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/image-analysis"
                  className="px-8 py-3 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
                >
                  Try AI Analysis First
                </Link>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
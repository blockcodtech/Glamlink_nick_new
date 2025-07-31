import Link from "next/link";

export default function ForProfessionalsPage() {
  const benefits = [
    {
      title: "Build Your Brand",
      description: "Create your own professional beauty brand with a complete digital storefront.",
      icon: "🏪"
    },
    {
      title: "AI-Powered Tools",
      description: "Use AI to generate product listings, content, and marketing materials instantly.",
      icon: "🤖"
    },
    {
      title: "Certification System",
      description: "Get certified at different levels (Bronze to Platinum) to showcase your expertise.",
      icon: "🏆"
    },
    {
      title: "Client Management",
      description: "Track appointments, manage client relationships, and build loyalty.",
      icon: "👥"
    },
    {
      title: "Training Programs",
      description: "Create and sell your own training courses to share your expertise.",
      icon: "📚"
    },
    {
      title: "Business Insights",
      description: "Access analytics and AI-powered brainstorming to grow your business.",
      icon: "📊"
    }
  ];

  const certificationLevels = [
    {
      level: "Bronze",
      color: "from-amber-600 to-amber-700",
      requirements: ["Basic certification", "1+ year experience", "Portfolio submission"],
      benefits: ["Profile listing", "Basic badge", "Client bookings"]
    },
    {
      level: "Silver",
      color: "from-gray-400 to-gray-500",
      requirements: ["Advanced certification", "3+ years experience", "Client testimonials"],
      benefits: ["Priority listing", "Silver badge", "Featured spots"]
    },
    {
      level: "Gold",
      color: "from-yellow-500 to-yellow-600",
      requirements: ["Expert certification", "5+ years experience", "Specialized training"],
      benefits: ["Top listing", "Gold badge", "Premium features"]
    },
    {
      level: "Platinum",
      color: "from-purple-600 to-purple-700",
      requirements: ["Master certification", "10+ years experience", "Industry recognition"],
      benefits: ["Elite status", "Platinum badge", "Exclusive opportunities"]
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
                    Grow Your Beauty Business with Glamlink
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Join thousands of beauty professionals who are building thriving businesses 
                    on Glamlink. Get the tools, visibility, and support you need to succeed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/signup"
                      className="px-8 py-3 bg-glamlink-teal text-white font-semibold rounded-full hover:bg-glamlink-teal-dark transition-colors text-center"
                    >
                      Start Your Brand
                    </Link>
                    <Link
                      href="/about"
                      className="px-8 py-3 bg-white text-glamlink-teal font-semibold rounded-full border-2 border-glamlink-teal hover:bg-gray-50 transition-colors text-center"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="relative h-96 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
                  <div className="absolute inset-4 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <p className="text-gray-600 text-lg">Professional Success Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Everything You Need to Succeed
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certification Levels */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Certification Levels
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Progress through our certification levels to unlock more features and build trust with clients.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certificationLevels.map((cert) => (
                  <div
                    key={cert.level}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{cert.level}</h3>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Requirements:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {cert.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-glamlink-teal mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Benefits:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {cert.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-glamlink-teal mr-2">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-glamlink-teal/10 to-cyan-50 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Success Story
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
                  <div>
                    <div className="text-4xl font-bold text-glamlink-teal mb-2">300%</div>
                    <p className="text-gray-600">Revenue Growth</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-glamlink-teal mb-2">5,000+</div>
                    <p className="text-gray-600">New Clients</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-glamlink-teal mb-2">4.9★</div>
                    <p className="text-gray-600">Average Rating</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                  "Glamlink transformed my small beauty practice into a thriving business. 
                  The AI tools saved me hours on content creation, and the certification 
                  system helped me attract premium clients. I've tripled my revenue in just 6 months!"
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">Maria Rodriguez</p>
                  <p className="text-gray-600">Platinum Certified Provider, Miami</p>
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
                Ready to Take Your Beauty Business to the Next Level?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join Glamlink today and get instant access to all the tools you need to succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-white text-glamlink-teal font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start Free Today
                </Link>
                <Link
                  href="/faqs"
                  className="px-8 py-3 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
                >
                  View FAQs
                </Link>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                No credit card required • Free forever plan available
              </p>
            </div>
          </div>
        </section>
    </div>
  );
}
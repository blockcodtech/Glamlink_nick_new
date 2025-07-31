import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Innovation",
      description: "Leveraging AI and technology to revolutionize the beauty industry",
      icon: "💡"
    },
    {
      title: "Empowerment",
      description: "Enabling beauty professionals to build and grow their businesses",
      icon: "🚀"
    },
    {
      title: "Community",
      description: "Creating connections between brands, professionals, and clients",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "Maintaining the highest standards in beauty education and services",
      icon: "⭐"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Beauty Professionals" },
    { number: "500+", label: "Partner Brands" },
    { number: "1M+", label: "Happy Clients" },
    { number: "50+", label: "Cities Covered" }
  ];

  return (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About Glamlink
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're building the future of beauty commerce by connecting brands, 
                professionals, and clients through innovative technology and AI-powered tools.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-glamlink-teal/10 to-cyan-50 rounded-2xl p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Glamlink empowers beauty entrepreneurs to create and manage their own digital 
                  storefronts, connect with certified beauty professionals, and leverage AI-powered 
                  tools to grow their businesses. We believe in democratizing beauty commerce by 
                  making professional tools accessible to everyone.
                </p>
                <Link
                  href="/brand"
                  className="inline-flex items-center text-glamlink-teal font-semibold hover:text-glamlink-teal-dark transition-colors"
                >
                  Explore Our Brands
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value) => (
                  <div key={value.title} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Our Growing Community
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-bold text-glamlink-teal mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-glamlink-teal to-cyan-600">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Join the Beauty Revolution?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Whether you're a brand owner, beauty professional, or client, 
                there's a place for you in the Glamlink community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-white text-glamlink-teal font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/for-professionals"
                  className="px-8 py-3 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
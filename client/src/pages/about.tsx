import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-20 clk-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold clk-text-black mb-4">
            About CLKtech
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading innovation in robotics education and professional development tools
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission */}
          <div>
            <h2 className="text-3xl font-semibold clk-text-black mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg">
              At CLKtech, we believe that robotics education should be accessible to everyone. Our mission is to provide high-quality, affordable robot controller boards and intuitive programming tools that enable students, educators, and professionals to bring their robotic visions to life.
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              Founded in 2020, we've been at the forefront of educational robotics technology, developing innovative solutions that bridge the gap between complex programming and creative robotics projects.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold clk-text-orange mb-2">2020</div>
                  <p className="text-gray-600">Founded</p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold clk-text-orange mb-2">10,000+</div>
                  <p className="text-gray-600">Products Sold</p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold clk-text-orange mb-2">25+</div>
                  <p className="text-gray-600">Countries</p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold clk-text-orange mb-2">15</div>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Team Image */}
          <div>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold clk-text-black">CLKtech Team</h3>
                <p className="text-gray-600">Dedicated professionals working to advance robotics education</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold clk-text-black text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                We constantly push the boundaries of what's possible in robotics education, developing cutting-edge tools and technologies.
              </p>
            </Card>
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Accessibility</h3>
              <p className="text-gray-600 text-center">
                We believe robotics should be accessible to everyone, regardless of their technical background or experience level.
              </p>
            </Card>
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                Every product we create undergoes rigorous testing to ensure it meets the highest standards of quality and reliability.
              </p>
            </Card>
          </div>
        </div>

        {/* Story */}
        <Card className="p-8 mb-16">
          <CardContent>
            <h2 className="text-3xl font-bold clk-text-black mb-6 text-center">Our Story</h2>
            <div className="prose max-w-none text-gray-600 text-lg leading-relaxed">
              <p className="mb-6">
                CLKtech was born from a simple observation: traditional robotics education was too complex and inaccessible for most learners. Our founders, experienced engineers and educators, recognized the need for a more intuitive approach to teaching robotics concepts.
              </p>
              <p className="mb-6">
                Starting with a small team of passionate developers, we set out to create hardware and software solutions that would democratize robotics education. Our first product, the LineX controller, was designed specifically for educational environments, combining powerful functionality with user-friendly design.
              </p>
              <p className="mb-6">
                Today, CLKtech products are used in schools, universities, and makerspaces around the world. Our block-based programming environment has helped thousands of students and professionals create their first robotic projects, and we're just getting started.
              </p>
              <p>
                As we look to the future, we remain committed to our original mission: making robotics education accessible, engaging, and effective for learners of all ages and backgrounds.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold clk-text-black mb-4">Ready to Start Your Robotics Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of educators and students who have chosen CLKtech for their robotics projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn-primary px-8 py-3 rounded-lg text-white font-semibold inline-block">
              Explore Products
            </a>
            <a href="/contact" className="btn-secondary px-8 py-3 rounded-lg font-semibold inline-block">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

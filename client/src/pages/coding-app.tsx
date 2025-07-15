import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Play, Check, AppWindowMac, Apple, Monitor } from "lucide-react";
import codingAppImage from "@assets/CLK_Block_Code_4_1752565795956.png";

export default function CodingApp() {
  return (
    <div className="min-h-screen py-20 clk-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold clk-text-black mb-4">
            CLK Block Code
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intuitive block-based coding environment makes programming robots accessible to everyone. From beginners to advanced users, create complex behaviors with simple drag-and-drop operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* App Info */}
          <div>
            <h2 className="text-3xl font-bold clk-text-black mb-6">
              Visual Programming Made Simple
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              CLK Block Code transforms complex programming into an intuitive visual experience. Whether you're a student learning robotics or a professional developing advanced systems, our block-based interface helps you focus on logic rather than syntax.
            </p>
            
            <Card className="feature-card p-6 mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold clk-text-black">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Visual block-based programming</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Real-time code generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Hardware simulation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Multi-platform support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Built-in debugging tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    <span>Library of pre-built blocks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Download Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold clk-text-black">Download CLK Block Code</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/downloads/clk-block-code-windows.exe" download>
                  <Button className="btn-primary w-full py-4 flex items-center justify-center">
                    <AppWindowMac className="w-5 h-5 mr-2" />
                    AppWindowMac
                  </Button>
                </a>
                <a href="/downloads/clk-block-code-mac.dmg" download>
                  <Button className="btn-primary w-full py-4 flex items-center justify-center">
                    <Apple className="w-5 h-5 mr-2" />
                    macOS
                  </Button>
                </a>
                <a href="/downloads/clk-block-code-linux.deb" download>
                  <Button className="btn-primary w-full py-4 flex items-center justify-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Linux
                  </Button>
                </a>
              </div>
              <p className="text-sm text-gray-600 text-center">
                System Requirements: AppWindowMac 10+, macOS 10.14+, Ubuntu 18.04+
              </p>
            </div>
          </div>

          {/* App Screenshot */}
          <div>
            <Card className="bg-gray-900 p-4">
              <img
                src={codingAppImage}
                alt="CLK Block Code Interface"
                className="w-full rounded-lg shadow-lg"
              />
            </Card>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold clk-text-black text-center">
              Getting Started Tutorial
            </CardTitle>
            <p className="text-center text-gray-600">
              Learn how to program your first robot with CLK Block Code
            </p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="CLK Block Code Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold clk-text-black mb-2">1. Download & Install</h3>
            <p className="text-gray-600">
              Download the appropriate version for your operating system and follow the installation guide.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold clk-text-black mb-2">2. Connect Your Robot</h3>
            <p className="text-gray-600">
              Connect your CLKtech controller board to your computer via USB and select your device.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold clk-text-black mb-2">3. Start Programming</h3>
            <p className="text-gray-600">
              Drag and drop blocks to create your program, then upload it to your robot and watch it come to life!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

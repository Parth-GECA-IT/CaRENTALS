import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  // Static content for 404 page
  const errorCode = "404";
  const errorTitle = "Page Not Found";
  const errorMessage = "The page you are looking for doesn't exist or has been moved.";
  
  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4 bg-[#1A1A1A] border-[#333333] text-white">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="flex flex-col items-center text-center mb-6">
              <AlertCircle className="h-16 w-16 text-[#FF6B35] mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">{errorCode}</h1>
              <h2 className="text-xl font-semibold text-gray-300 mb-4">{errorTitle}</h2>
              <p className="text-gray-400">
                {errorMessage}
              </p>
            </div>

            <Link href="/">
              <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

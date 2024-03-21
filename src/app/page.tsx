import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
      <div className="flex items-center text-3xl font-medium">
      <ChevronUp className="w-16 h-16" />
      Start FELLOWSHIP
      </div>
      <div className="text-2xl font-medium mb-3">Incubator. Accelerator. Investor Network.</div>
      <div className="text-2xl font-medium"> EQUAL OPPORTUNITIES FOR ALL</div>
      <div className="flex gap-3">
      <Link href="/login" className="mt-10"><Button>Login</Button></Link>
      <Link href="/login" className="mt-10"><Button variant={'outline'}>SignUp</Button></Link>
      </div>
    </main>
  );
}

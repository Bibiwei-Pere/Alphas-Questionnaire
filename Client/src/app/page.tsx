"use client";
import { Button } from "@/components/ui/button";
import { Reveal } from "./components/animations/Text";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetQuestionnaires, usePostQuestionnaire } from "@/hooks/questionnaire";
import { Loader, Loader2 } from "lucide-react";

export default function Home() {
  const { data: questionnaires, status } = useGetQuestionnaires();
  const [remaining, setRemaining] = useState(300);
  const mutation = usePostQuestionnaire();
  const router = useRouter();

  useEffect(() => {
    if (questionnaires?.length > 0) {
      setRemaining(300 - questionnaires?.length);
    }
  }, [questionnaires]);

  return (
    <main>
      <Header />
      <section className='bg-brown-50 py-[90px] md:py-[120px]'>
        <div className='mx-auto flex flex-col gap-4 sm:gap-9 items-center justify-center sm:bg-brown-700 p-4 sm:p-6 lg:p-12 max-w-[1220px]'>
          <div className='border-y-[3px] border-white'>
            <div className='border-y-[3px] my-1 border-white'>
              <h1 className='text-white py-2'>QUESTIONNAIRE.</h1>
            </div>
          </div>
          <div className='my-4'>
            <Reveal width='100%'>
              <h4 className='uppercase text-center font-[200] text-white'>
                This platform is developed to support data collection for{" "}
                <b>Community Medicine Project Groups 2, 3, and 9</b> of Niger Delta University.
              </h4>
            </Reveal>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Button
              disabled={mutation?.isPending}
              onClick={() =>
                mutation.mutate(
                  {},
                  {
                    onSuccess: (responses) => router.push(`/questionnaire/${responses?.data}`),
                  }
                )
              }
              className='gap-2'
              variant='outline'
            >
              Start Questionnaire
              {mutation?.isPending && <Loader className='w-5 h-5 animate-spin' />}
            </Button>
            <Button onClick={() => router.push("/response")} variant='outline'>
              View Responses
            </Button>
          </div>
          <Reveal width='100%'>
            <h4 className='uppercase text-center font-[200] text-white'>
              Responses Collected: <b>{questionnaires?.length || 0}</b>
            </h4>
          </Reveal>
          <Reveal width='100%'>
            <h4 className='uppercase text-center font-[200] flex gap-2 items-center text-white'>
              Remaining: <b>{status !== "success" ? <Loader2 className='w-5 h-5 animate-spin' /> : remaining}</b>
            </h4>
          </Reveal>
        </div>
      </section>
      <footer className='py-20 text-center bg-gray-200 text-sm'>
        <p>© 2025 All right reserved</p>
      </footer>
    </main>
  );
}

const Header = ({ isDisable = false }: { isDisable?: boolean }) => {
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) setScroll(true);
    else setScroll(false);
  };

  return (
    <div
      className={`z-50 fixed top-0 flex flex-col right-0 left-0 max-w-screen-2xl mx-auto w-full ${
        scroll ? "bg-white shadow-sm" : isDisable ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <h4
        onClick={() => router.push("/")}
        className={cn(
          "p-4 lg:px-8 xl:px-24 cursor-pointer hover:text-brown-700 font-semibold",
          scroll ? "text-gray-500" : isDisable ? "text-gray-500" : "text-white"
        )}
      >
        ALPHAS
      </h4>
    </div>
  );
};

import ChatContainer from "@/components/chat-container";
import { createClient } from "@/lib";

const Home = async () => {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // GUEST MODE: Always show the ChatContainer
    // If user is logged in, use their data; otherwise, pass null for guest mode
    return (
        <div className="flex items-center justify-center w-full relative h-dvh group overflow-auto transition-all duration-300 ease-in-out z-0">
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full w-full h-1/6 blur-[10rem] hidden lg:block opacity-10"></div>
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full w-3/4 h-1/6 blur-[10rem] hidden lg:block opacity-10"></div>
            <div className="fixed -z-10 top-1/8 left-1/4 -translate-x-1/4 bg-orange-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply hidden lg:block opacity-20"></div>
            <div className="fixed -z-10 top-1/8 right-1/4 translate-x-1/4 bg-sky-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply hidden lg:block opacity-20"></div>

            <ChatContainer user={user} messages={[]} />
        </div>
    )
};

export default Home

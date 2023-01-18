import Head from "next/head";
import { FormEventHandler, useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";
import SLink from "../components/slink";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [hasSubjectError, setHasSubjectError] = useState(false);
  const form = useRef<HTMLFormElement>();

  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (subject.length == 0) {
      setHasSubjectError(true);
      return;
    }
    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          form.current,
          "WjQW5PKpvriHlu108"
        )
        .then(
          (result) => {
            console.log(result.text);
            setHasSubjectError(false);
            setSubject("");
            setBody("");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <>
      <Head>
        <title>Mark Pekala - Contact</title>
        <meta
          name="description"
          content="Mark Pekala maybe wants to hear from you. No guarantees."
        />
      </Head>
      <div>
        <div className="flex items-center mb-2">
          <p className="mr-2">Quick Links:</p>
          <SocialIcon
            className="scale-[0.75]"
            url="https://github.com/mpekala23?tab=repositories"
            bgColor="#F1F5F9"
            fgColor="#0F172A"
          />
          <SocialIcon
            className="ml-0.5 scale-[0.75]"
            url="https://www.linkedin.com/in/mark-pekala/"
            bgColor="#F1F5F9"
            fgColor="#0F172A"
          />
          <SocialIcon
            className="ml-0.5 scale-[0.75]"
            url="https://stackoverflow.com/users/13570378/mark-pekala"
            bgColor="#F1F5F9"
            fgColor="#0F172A"
          />
          <SocialIcon
            className="ml-0.5 scale-[0.75]"
            url="https://open.spotify.com/user/mpek66?si=8e586285aca84768"
            bgColor="#F1F5F9"
            fgColor="#0F172A"
          />
          <SocialIcon
            className="ml-0.5 scale-[0.75]"
            url="mailto:mpek66@gmail.com"
            bgColor="#F1F5F9"
            fgColor="#0F172A"
          />
        </div>
        <p className="text-md mb-1">Subject:</p>
        <form ref={form} onSubmit={sendMessage}>
          <input
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            className="bg-slate-700 p-1 w-full mb-4"
          />
          <p className="text-md mb-1">Body:</p>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-slate-700 p-1 h-48 w-full mb-4"
            style={{ resize: "none" }}
          />
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer p-1 hover:text-lime-200 border border-white hover:border-lime-200 transition-all hover:-translate-y-[0.08rem] hover:underline"
          />
        </form>
        {hasSubjectError && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Uh-oh!</strong>
            <span className="block sm:inline"> Subject is required</span>
            <span
              onClick={() => {
                setHasSubjectError(false);
              }}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

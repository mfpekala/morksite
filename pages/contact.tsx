import Head from "next/head";
import { createRef, FormEventHandler, useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const form = createRef<HTMLFormElement>();

  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (subject.length == 0) {
      setErrorMessage("Subject is required.");
      return;
    }
    if (isSendingMessage) {
      setErrorMessage(
        "Cannot send two messages at once. Please wait for your first message to send."
      );
      return;
    }
    if (form.current) {
      setIsSendingMessage(true);
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          form.current,
          "WjQW5PKpvriHlu108"
        )
        .then(
          (result) => {
            setIsSendingMessage(false);
            setErrorMessage("");
            setSuccessMessage("Message sent successfully.");
            setSubject("");
            setBody("");
          },
          (error) => {
            setIsSendingMessage(false);
            setErrorMessage("Failed to send message.");
            setSuccessMessage("");
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
        <div className="sm:flex items-center mb-2">
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
          <div className="flex">
            <input
              type="submit"
              value="Submit"
              className="cursor-pointer p-1 hover:text-lime-200 border border-white hover:border-lime-200 transition-all hover:-translate-y-[0.08rem] hover:underline"
            />
            {isSendingMessage && (
              <svg
                aria-hidden="true"
                className="w-8 h-8 mx-4 text-lime-200 animate-spin dark:text-lime-300 fill-lime-900"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </div>
        </form>
        {errorMessage.length > 0 && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Uh-oh!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
            <span
              onClick={() => {
                setErrorMessage("");
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
        {successMessage.length > 0 && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Congrats!</strong>
            <span className="block sm:inline"> {successMessage}</span>
            <span
              onClick={() => {
                setSuccessMessage("");
              }}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-green-500"
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

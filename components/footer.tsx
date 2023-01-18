import { SocialIcon } from "react-social-icons";

export default function footer() {
  return (
    <div className="flex justify-between items-center my-8">
      <p className="text-xs">
        Copyright Mark Pekala™ 2023, although I have no idea what that means.
      </p>
      <div className="flex">
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
    </div>
  );
}

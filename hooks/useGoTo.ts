import { useRouter } from "next/router";

export default function useGoTo() {
  const router = useRouter();

  const goTo = (route: string, props = { newTab: false }) => {
    return () => {
      if (props.newTab) {
        window.open(route, "_blank");
      } else {
        router.push(route);
      }
    };
  };

  return goTo;
}

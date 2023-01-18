import { ReactElement, useCallback, useState } from "react";
import Modal from "../components/modal";

export default function useModal(): [
  ({ children }: { children: ReactElement | ReactElement[] }) => JSX.Element,
  () => void,
  () => void
] {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const partialModal = ({
    children,
  }: {
    children: ReactElement | ReactElement[];
  }) => {
    return Modal({ isOpen, setIsOpen, children });
  };

  return [partialModal, openModal, closeModal];
}

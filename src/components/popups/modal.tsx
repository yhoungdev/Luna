import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import Button from "../ui/button";

interface IModal {
  isOpen: boolean;
  children: React.ReactNode;
  onOpen: () => void;
  closeModal: () => void;
}

const Modal: FC<IModal> = ({
  isOpen,
  children,
  onOpen,
  closeModal,
}: IModal): JSX.Element => {
  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" leading-6 text-gray-900"
                  >
                    
                  </Dialog.Title>
                  <div className="mt-2 text-satoshi">
                    {children}
                  </div>

                  <div className="mt-4">
                    <center>
                    <Button onClick={closeModal}>Ok, Got It !</Button>
                    </center>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

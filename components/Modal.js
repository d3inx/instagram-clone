import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { modalState } from "../atoms/modalState";
import { addDoc , collection , serverTimestamp , updateDoc , doc } from "@firebase/firestore";
import { db , storage} from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage"; 

export default function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const { data: session } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const UploadPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef  = await addDoc(collection(db, "posts"), {
      username : session.user.username,
      profile : session.user.image,
      caption : captionRef.current.value,
      timestamp : serverTimestamp(),
    })


    const imgRef = ref(storage , `posts/${docRef.id}/image`);

    await uploadString(imgRef , selectedFile , 'data_url').then(async snapshot => {
      const downloadURL = await getDownloadURL(imgRef)

      await updateDoc(doc(db, "posts", docRef.id), {
        image : downloadURL,
      })
    });

    setLoading(false)
    setOpen(false)
    setSelectedFile(null)
    captionRef.current.value = ""



  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  <div className=" flex my-4  justify-center">
                    {selectedFile ? (
                      <img src={selectedFile} onClick={() => setSelectedFile(null)} className="w-full" alt="" />
                    ) : (
                      <CameraIcon
                        onClick={() => filePickerRef.current.click()}
                        className="w-12 h-12 p-[5px] rounded-full cursor-pointer hover:scale-125 transform duration-200  bg-blue-200 text-blue-800"
                      />
                    )}
                  </div>
                  <div className="my-4 text-center text-xl">
                    Upload A Photo
                  </div>
                  <div className="mt-2">
                    <input
                      className="w-full focus:outline-none p-4 text-center text-lg"
                      ref={captionRef}
                      type="text"
                      placeholder="Please Enter a Caption..."
                    />
                  </div>
                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-50 disabled:to-blue-500"
                      onClick={UploadPost}
                    >
                      Upload Post!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

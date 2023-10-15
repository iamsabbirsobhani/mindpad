'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function ClientPad({ email }: { email: any }) {
  const [note, setnote] = useState<any>('');
  const [isLoading, setisLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getPad = async () => {
      try {
        setisLoading(true);
        const res = await fetch(`/api/pad/${params.id}/${email}`);
        const pad = await res.json();
        setisLoading(false);
        setnote(pad);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    };
    getPad();
  }, [params.id, email]);

  return (
    <div className=" ml-24">
      {isLoading ? (
        <div className="w-32 h-32 mx-auto mt-10">
          <div className="w-8 h-8 border-t-4 border-t-gray-700 border-l-4 border-l-white border-r-4 border-r-white border-b-white border-b-4  rounded-full animate-spin"></div>
        </div>
      ) : note && note.pad ? (
        <div className="p-4">
          <div className="bg-white p-4 ">
            {/* <div className="whitespace-pre-line text-gray-700 break-all">
              {note && note.pad && note.pad.note}
            </div> */}
            <div
              className="whitespace-pre-line  break-all"
              dangerouslySetInnerHTML={{
                __html: note && note.pad && note.pad.note,
              }}
            ></div>
          </div>
        </div>
      ) : null}
      {note && note.pad === null ? (
        // pad not found or you dont have enough permission make it with tailwind css style
        <div className="bg-red-500 text-white p-4 rounded text-center mr-4 mt-5">
          <div className="my-4">
            Note not found or you don&apos;t have enough permission.
          </div>
        </div>
      ) : null}
    </div>
  );
}

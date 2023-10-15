import {
  setIsQuillOpen,
  setQuillValue,
  setSelectedPad,
} from '@/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Linkn } from '../Linkn';
import QuillEditor from '../quill';

export default function Pad({
  color,
  hover,
  style,
  isNewPad,
  data,
  user,
}: {
  color: string | undefined;
  hover?: string | undefined;
  style?: {
    id: number;
    color: string;
    hover: string;
    createdAt?: string;
    updatedAt?: string;
    padId?: number;
  } | null;
  isNewPad: boolean;
  data?: any;
  user?: any;
}) {
  const openQuill = useAppSelector((state) => state.ui.isQuillOpen);
  const quillValue = useAppSelector((state) => state.ui.quillValue);
  const dispatch = useAppDispatch();
  const formRef = useRef<any>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [hasErrorMsg, sethasErrorMsg] = useState<boolean>(false);
  const [errorMsg, seterrorMsg] = useState<any>('');
  const [uploadedFilePath, setuploadedFilePath] = useState<any>('');

  const handlePadPost = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (e.currentTarget) {
        setisLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const postData = {
          note: data.note,
          color: style?.color,
          hover: style?.hover,
        };

        const res = await fetch('/api/newpad', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          const pad = await res.json();
          if (pad && pad.status === 200) {
            formRef.current.reset();
            setisLoading(false);
            dispatch(setSelectedPad(null));
            window.location.reload();
          } else {
            setisLoading(false);
            sethasErrorMsg(true);
            seterrorMsg(pad);
          }
        } else {
          setisLoading(false);
          sethasErrorMsg(true);
          seterrorMsg('Something went wrong!');
          console.log('error');
        }
      }
    } catch (error) {
      console.log(error);
      sethasErrorMsg(true);
      seterrorMsg('Something went wrong!');
      setisLoading(false);
    }
  };

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setisLoading(true);
      if (e.currentTarget) {
        setisLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const padData = Object.fromEntries(formData.entries());

        const postData = {
          note: padData.note,
          id: data.id,
          authorEmail: data.authorEmail,
        };

        const res = await fetch('/api/pad/update', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          const pad = await res.json();
          if (pad && pad.status === 200) {
            formRef.current.reset();
            dispatch(setSelectedPad(null));
            window.location.reload();
            setisLoading(false);
            setisEdit(false);
          } else {
            setisLoading(false);
            setisEdit(false);
            sethasErrorMsg(true);
            seterrorMsg(pad);
          }
        } else {
          setisLoading(false);
          console.log('error');
          sethasErrorMsg(true);
          seterrorMsg('Something went wrong!');
          setisEdit(false);
        }
      }
    } catch (error) {
      console.log(error);
      sethasErrorMsg(true);
      seterrorMsg('Something went wrong!');
      setisLoading(false);
      setisEdit(false);
    }
  };

  const closeErrorMsg = () => {
    sethasErrorMsg(false);
    seterrorMsg('');
  };

  const deletePad = async () => {
    try {
      setisLoading(true);

      const delData = {
        id: data.id,
        padStyleId: data.padStyles[0].id,
        authorEmail: data.authorEmail,
      };

      const res = await fetch('/api/pad/delete', {
        method: 'POST',
        body: JSON.stringify(delData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const pad = await res.json();
        if (pad && pad.status === 200) {
          dispatch(setSelectedPad(null));
          window.location.reload();
          setisLoading(false);
          setisEdit(false);
        } else {
          setisLoading(false);
          setisEdit(false);
          sethasErrorMsg(true);
          seterrorMsg(pad);
        }
      } else {
        setisLoading(false);
        console.log('error');
        sethasErrorMsg(true);
        seterrorMsg('Something went wrong!');
        setisEdit(false);
      }
    } catch (error) {
      console.log(error);
      sethasErrorMsg(true);
      seterrorMsg('Something went wrong!');
      setisLoading(false);
      setisEdit(false);
    }
  };

  const handleUploadFile = async (e: any) => {
    setisLoading(true);
    if (!user) {
      return;
    }
    // Upload file using standard upload
    const supabaseStorageURL = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/`;
    // Create Supabase client
    const supabase = createClient(
      supabaseStorageURL,
      `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    );

    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_BUCKET_NAME || '')
      .upload(`files/${user.id}/${e.target.files[0].name}`, e.target.files[0], {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png',
      });

    if (error) {
      // Handle error
      console.log(error);
      setisLoading(false);
      setuploadedFilePath('');
    } else {
      const pathData = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${data.path}`;

      setuploadedFilePath(pathData);

      const fileInfo = {
        fileName: e.target.files[0].name,
        fileType: e.target.files[0].type,
        filesize: e.target.files[0].size,
        url: pathData,
      };

      const res = await fetch('/api/file/upload', {
        method: 'POST',
        body: JSON.stringify(fileInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const pad = await res.json();
        if (pad && pad.status === 200) {
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      } else {
        setisLoading(false);
        console.log('error');
      }
    }
  };

  return (
    <>
      <div
        className={
          ` ${color}  rounded-2xl p-3 transition-all duration-700 shadow-md relative m-3 w-56 ` +
          `${
            style
              ? ' right-0 h-56  visible opacity-100  ease-[cubic-bezier(.05,.31,.33,1.33)]'
              : ' right-full h-0  invisible opacity-0 ease-out-[cubic-bezier(.05,.31,.33,1.33)] '
          }`
        }
      >
        {/* date */}
        <div>
          {isNewPad ? (
            <h1 className=" text-xs text-gray-500">
              Creating on: {format(new Date(), 'PPP')}
            </h1>
          ) : (
            <h1 className=" text-xs text-gray-500">
              {/* {new Date(data.updatedAt).toLocaleString()} */}
              {format(new Date(data.updatedAt), 'PPPp')}
            </h1>
          )}
        </div>
        {isNewPad || isLoading ? (
          <div
            className={`absolute  left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-30 rounded-2xl flex justify-center items-center w-full h-full ${
              isLoading ? 'visible opacity-100' : 'invisible opacity-0'
            }}`}
          >
            <h1 className=" animate-pulse absolute left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-30 rounded-2xl flex justify-center items-center">
              Saving...
            </h1>
          </div>
        ) : null}

        {hasErrorMsg ? (
          <div
            className={`absolute  left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-30 rounded-2xl flex justify-center items-center w-full h-full ${
              hasErrorMsg ? 'visible opacity-100' : 'invisible opacity-0'
            }}`}
          >
            <div className=" absolute left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-30 rounded-2xl flex justify-center items-center">
              <div className="bg-white rounded-2xl w-48 shadow-lg p-5">
                <h1 className="text-red-500 text-xl font-bold mb-2">Error!</h1>
                <h1 className="text-gray-800 text-md font-bold mb-2 break-words">
                  {errorMsg && errorMsg.error && errorMsg.error.name
                    ? errorMsg.error.name
                    : errorMsg}
                  . Try again.
                </h1>
                <button
                  onClick={closeErrorMsg}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* New pad */}
        {isNewPad || isEdit ? (
          <form
            onSubmit={isEdit ? handleEditPost : handlePadPost}
            ref={formRef}
            className=" relative h-full"
          >
            {!isEdit ? (
              <textarea
                className="w-full h-[65%] bg-transparent outline-none resize-none placeholder:text-gray-700"
                placeholder="This is MindPad note."
                required
                name="note"
                onChange={(e) => {
                  dispatch(setQuillValue(e.target.value));
                }}
                value={
                  uploadedFilePath
                    ? uploadedFilePath
                    : quillValue
                    ? quillValue
                    : ''
                }
              />
            ) : (
              <textarea
                className="w-full h-[65%] bg-transparent outline-none resize-none placeholder:text-gray-700"
                placeholder="This is MindPad note."
                required
                name="note"
                defaultValue={data && data.note ? data.note : ''}
              />
            )}
            <div className="flex justify-between items-center">
              <div>
                {/* newpad cancel button */}
                {!isEdit ? (
                  <button
                    className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-0 hover:bg-gray-600 transition-all duration-300"
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedPad(null));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  // edit cancel
                  <button
                    className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-0 hover:bg-gray-600 transition-all duration-300"
                    type="button"
                    onClick={() => {
                      setisEdit(!isEdit);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div>
                {/* create new pad */}
                {isEdit ? (
                  <button
                    className=" focus:outline-none bg-green-500 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-0 hover:bg-green-600 transition-all duration-300"
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </button>
                ) : (
                  // edit pad
                  <div className="flex flex-row-reverse justify-between items-center">
                    <button
                      className=" focus:outline-none bg-green-500 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-0 hover:bg-green-600 transition-all duration-300"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>

                    {/* Quill Editor tab */}
                    {openQuill ? (
                      <div>
                        <QuillEditor />
                      </div>
                    ) : null}

                    {/* Quill Editor button */}
                    <div>
                      <button
                        className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-0 hover:bg-gray-600 transition-all duration-300 mr-3"
                        type="button"
                        onClick={() => {
                          dispatch(setIsQuillOpen(true));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* file upload */}
                    <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center mr-3 relative cursor-pointer">
                      <input
                        type="file"
                        name=""
                        id=""
                        className="  absolute w-full h-full top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center rounded-full overflow-hidden  cursor-pointer opacity-0"
                        onChange={handleUploadFile}
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        ) : (
          <div className=" h-full">
            {/* data showing part / output */}

            <div className=" h-full">
              <div className="w-full h-[65%] bg-transparent outline-none resize-none placeholder:text-gray-700 overflow-y-auto overflow-x-hidden break-words">
                <h1>
                  {data && data.note
                    ? data.note
                    : 'This is MindPad note. You can edit this note by clicking edit button.'}
                </h1>
              </div>
            </div>

            {/* UD part */}
            <form className="flex justify-between items-center relative bottom-[59px]">
              <button
                className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-gray-600 transition-all duration-300"
                type="button"
                onClick={() => {
                  setisEdit(!isEdit);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>

              <Linkn href={`/dashboard/pad/${data && data.id}`}>
                <button
                  className=" focus:outline-none bg-gray-50 rounded-full w-10 h-10 flex justify-center items-center text-gray-800 relative bottom-1 hover:bg-white transition-all duration-300 active:bg-gray-200"
                  type="button"
                  onClick={() => {
                    console.log(data && data.id);
                    dispatch(setSelectedPad(null));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                </button>
              </Linkn>

              {/* delete button */}
              <button
                className=" focus:outline-none bg-rose-500 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-rose-400 transition-all duration-300"
                type="button"
                onClick={() => {
                  deletePad();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

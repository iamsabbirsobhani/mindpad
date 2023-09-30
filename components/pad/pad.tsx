import { setSelectedPad } from '@/features/ui/uiSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRef } from 'react';
export default function Pad({
  color,
  hover,
  style,
  isNewPad,
  data,
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
}) {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>();

  const handlePadPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget) {
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
      });

      if (res.status === 200) {
        const pad = await res.json();
        if (pad && pad.status === 200) {
          formRef.current.reset();
          dispatch(setSelectedPad(null));
        }
      }
    }
  };

  return (
    <>
      <div
        className={
          ` ${color}  rounded-2xl p-3 transition-all duration-700 shadow-md relative m-3 w-52 ` +
          `${
            style
              ? ' right-0 h-52  visible opacity-100  ease-[cubic-bezier(.05,.31,.33,1.33)]'
              : ' right-full h-0  invisible opacity-0 ease-out-[cubic-bezier(.05,.31,.33,1.33)] '
          }`
        }
      >
        {isNewPad ? (
          <form onSubmit={handlePadPost} ref={formRef} className=" h-full">
            <textarea
              className="w-full h-[75%] bg-transparent outline-none resize-none placeholder:text-gray-700"
              placeholder="This is MindPad note."
              required
              name="note"
            />
            <div className="flex justify-between items-center">
              <div>
                <button
                  className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-gray-600 transition-all duration-300"
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
              </div>
              <div>
                <button
                  className=" focus:outline-none bg-green-500 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-green-600 transition-all duration-300"
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
              </div>
            </div>
          </form>
        ) : (
          <>
            {/* data showing part */}
            <div>
              <h1>Has data</h1>
              <p>{data.note}</p>
            </div>
            {/* UD part */}
            <div className="flex justify-between items-center relative top-24">
              <button
                className=" focus:outline-none bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-gray-600 transition-all duration-300"
                type="button"
                onClick={() => {}}
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

              <button
                className=" focus:outline-none bg-rose-500 rounded-full w-10 h-10 flex justify-center items-center text-white relative bottom-1 hover:bg-rose-400 transition-all duration-300"
                type="button"
                onClick={() => {}}
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
            </div>
          </>
        )}
      </div>
    </>
  );
}

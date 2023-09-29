import { setSelectedPad } from '@/features/ui/uiSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRef } from 'react';
export default function Pad({
  color,
  hover,
  style,
}: {
  color: string | undefined;
  hover?: string | undefined;
  style?: {
    id: number;
    color: string;
    hover: string;
  } | null;
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

      console.log(postData);

      const res = await fetch('/api/newpad', {
        method: 'POST',
        body: JSON.stringify(postData),
      });

      if (res.status === 200) {
        const pad = await res.json();
        if (pad && pad.status === 200) {
          formRef.current.reset();
        }
        console.log({ pad, msg: 'pad created' });
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
      </div>
    </>
  );
}

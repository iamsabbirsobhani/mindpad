import { setSelectedPad } from '@/features/ui/uiSlice';
import { useAppDispatch } from '@/store/hooks';
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
  return (
    <>
      <div
        className={
          ` ${color}  rounded-2xl p-3 transition-all duration-700 shadow-md relative m-3 w-52 ` +
          `${
            style
              ? ' right-0 h-52  visible opacity-100  ease-[cubic-bezier(.14,-0.26,.4,1.56)]'
              : ' right-full h-0  invisible opacity-0 ease-[cubic-bezier(.14,-0.26,.29,1.35)] '
          }`
        }
      >
        <textarea
          className="w-full h-[80%] bg-transparent outline-none resize-none placeholder:text-gray-700"
          placeholder="This is MindPad note."
        />
        <div className="flex justify-between items-center">
          <div>
            <button
              className=""
              onClick={() => {
                dispatch(setSelectedPad(null));
              }}
            >
              Close
            </button>
          </div>
          <div>
            <button className="">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

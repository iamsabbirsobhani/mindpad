import { setIsQuillOpen, setQuillValue } from '@/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor() {
  const [value, setValue] = useState('');
  const qvalue = useAppSelector((state) => state.ui.quillValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuillValue(value));
  }, [value, dispatch]);

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [
      { header: 1 },
      { header: 2 },
      { header: 3 },
      { header: 4 },
      { header: 5 },
      { header: 6 },
    ],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ];

  return (
    <div className="z-30 ml-24 w-full fixed bg-white left-0 right-0 top-0 bottom-0 h-full overflow-y-scroll">
      <div className="mt-3">
        <button
          className="bg-gray-800 font-bold uppercase text-white px-4 py-2 rounded-md mt-1"
          onClick={() => {
            dispatch(setIsQuillOpen(false));
          }}
        >
          Done
        </button>
      </div>
      <div className="">
        <ReactQuill
          className=" w-[90%] mt-5 h-[70vh]"
          theme="snow"
          placeholder="This is MindPad!"
          value={value ? value : qvalue}
          modules={{
            toolbar: toolbarOptions,
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
}

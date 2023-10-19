import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setData } from '@/features/data/dataSlice';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function Pagination({ page }: { page: any }) {
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const getPagePads = async (page: any) => {
    const res = await fetch('/api/pads', {
      method: 'POST',
      body: JSON.stringify({ ...user, page }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  };

  const { items } = usePagination({
    count: page,
    onChange: (e, page) => {
      dispatch(setData([]));
      getPagePads(page - 1).then((data) => {
        dispatch(setData(data));
      });
    },
  });

  return (
    <div className="">
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                className=" m-5 "
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children =
              type === 'next' ? (
                item && !item.disabled ? (
                  // next button
                  <button
                    className="m-5 uppercase bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 active:bg-gray-600"
                    type="button"
                    {...item}
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                ) : (
                  // next disabled button
                  <button
                    className="m-5 uppercase bg-gray-500 text-white rounded-full p-2 "
                    type="button"
                    {...item}
                    disabled
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                )
              ) : item && !item.disabled ? (
                // previous button
                <button
                  className="m-5 uppercase bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 active:bg-gray-600"
                  type="button"
                  {...item}
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              ) : (
                // previous disabled button
                <button
                  className="m-5 uppercase bg-gray-500 text-white rounded-full p-2 "
                  type="button"
                  {...item}
                  disabled
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </div>
  );
}

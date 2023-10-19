'use client';
import Pad from '@/components/pad/pad';
import Pagination from '@/components/pagination';
import { setUser } from '@/features/auth/authSlice';
import { setData } from '@/features/data/dataSlice';
import { setCurrentPage, setSpaceUsed } from '@/features/ui/uiSlice';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import _, { set } from 'lodash';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// import debounce from 'lodash.debounce';
export default function ClientDashboard({
  children,
  user,
  pads,
  space,
  fileSpace,
}: {
  children: React.ReactNode;
  user: any;
  pads: any;
  space: any;
  fileSpace: any;
}) {
  const [isprofilemenuopen, setisprofilemenuopen] = useState<boolean>(false);
  const [isSearchLoading, setisSearchLoading] = useState<boolean>(false);
  const [searchPads, setsearchPads] = useState<any>([]);
  const [searchMsg, setsearchMsg] = useState<any>('');
  const [isnotFound, setnotFound] = useState<any>(false);
  const padsState = useAppSelector((state: RootState) => state.data.data);
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const dispatch = useAppDispatch();

  const modalRef = useRef(null);
  const selectedpadStyle = useAppSelector(
    (state: RootState) => state.ui.selectedPad,
  );

  useOutsideClick(() => {
    setisprofilemenuopen(false);
  }, modalRef);

  const search = _.debounce(
    async (e) => {
      if (e.target.value === '') {
        setsearchPads([]);
        setnotFound(false);
        return;
      }
      try {
        setisSearchLoading(true);
        const delData = {
          searchText: e.target.value,
        };
        const res = await fetch('/api/pad/search', {
          method: 'POST',
          body: JSON.stringify(delData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          const pad = await res.json();
          if (pad && pad.status === 200) {
            if (pad && pad.pads && pad.pads.length === 0) {
              setsearchPads([]);
              setisSearchLoading(false);
              setnotFound(true);
              setsearchMsg('No notes found');
              return;
            }
            setsearchPads(pad.pads);
            setnotFound(false);
            setisSearchLoading(false);
          } else {
            setsearchPads([]);
            setsearchMsg(pad);
            setnotFound(true);
            setisSearchLoading(false);
          }
        } else {
          setisSearchLoading(false);
          setsearchPads([]);
          setsearchMsg('Something went wrong');
          setnotFound(true);
          console.log('error');
        }
      } catch (error) {
        console.log(error);
        setsearchPads([]);
        setsearchMsg('Something went wrong');
        setnotFound(true);
        setisSearchLoading(false);
      }
    },
    600,
    { trailing: true },
  );
  const handleSearch = (e: any) => {
    search(e);
  };

  useEffect(() => {
    dispatch(setSpaceUsed(space));
  }, [space, dispatch]);

  useEffect(() => {
    dispatch(setUser(user));
  }, [user, dispatch]);

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(setData(pads));
      dispatch(setCurrentPage(1));
    }
  }, [pads, dispatch, currentPage]);

  return (
    <>
      <div className="ml-24 mt-10">
        <div className=" flex justify-between items-center">
          {/* note search */}
          <div className=" relative">
            <input
              type="search"
              className="focus:outline-none ml-7 w-40 sm:w-28 md:w-32 lg:w-32 xl:w-96 2xl:w-96"
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <div className="absolute flex justify-center items-center top-0  bottom-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          {/* profile */}
          <div className="mr-5 relative">
            <div className="relative">
              <button
                className="ml-2 border rounded-full w-10 h-10 text-gray-700 font-bold mr-5"
                ref={modalRef}
                onClick={() => {
                  setisprofilemenuopen(!isprofilemenuopen);
                }}
              >
                {/* profile image */}
                {user && user.given_name && !user.picture ? (
                  user.given_name.charAt(0).toUpperCase() +
                  user.given_name.charAt(1).toUpperCase()
                ) : (
                  <Image
                    src={user.picture || ''}
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="object-contain rounded-full"
                  />
                )}
              </button>
            </div>
            {/* profile menu */}
            <div
              ref={modalRef}
              className={
                `transition-all duration-300 absolute right-5 mt-1 bg-white rounded-xl shadow-lg z-10 ` +
                `${
                  isprofilemenuopen
                    ? 'visible opacity-100'
                    : ' invisible opacity-0 '
                }`
              }
            >
              {children}
            </div>
          </div>
        </div>

        {/* Notes title */}
        <div className="mt-5 mb-2">
          <h1 className=" text-5xl font-extrabold text-gray-800">Notes</h1>
        </div>

        {/* search not found */}
        {isnotFound && !isSearchLoading ? (
          <div className="border max-w-lg text-center rounded-lg p-2 m-auto flex flex-col justify-center items-center w-full break-words break-all">
            <h1 className="text-2xl mt-3 mb-3 text-gray-800">
              {searchMsg && searchMsg.error && searchMsg.error.name
                ? searchMsg.error.name
                : searchMsg}
              . Try again.
            </h1>
          </div>
        ) : null}

        {/* search loading */}
        {isSearchLoading ? (
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl mt-3 mb-3 text-gray-800 animate-pulse">
              Searching...
            </h1>
          </div>
        ) : null}

        {padsState &&
        padsState.pad &&
        padsState.pad.length > 0 &&
        searchPads.length === 0 ? (
          <div className="mt-5 mb-2 ml-1">
            <h1 className="text-lg text-gray-500">Page {currentPage}</h1>
          </div>
        ) : null}

        {/* new pad */}
        <div className="">
          <Pad
            color={selectedpadStyle?.color}
            style={selectedpadStyle}
            isNewPad={true}
            user={user}
          />
        </div>

        {/* search results of pad */}
        <div className="flex flex-wrap">
          {searchPads && searchPads.length > 0
            ? searchPads.map((pad: any) => (
                <Pad
                  key={pad.id}
                  color={
                    pad &&
                    pad.padStyles &&
                    pad.padStyles.length > 0 &&
                    pad.padStyles[0].color
                  }
                  style={
                    pad &&
                    pad.padStyles &&
                    pad.padStyles.length > 0 &&
                    pad.padStyles[0]
                  }
                  isNewPad={false}
                  data={pad}
                />
              ))
            : null}
          {/* all pads */}
          {padsState &&
          padsState.pad &&
          padsState.pad.length > 0 &&
          searchPads.length === 0 ? (
            padsState.pad.map((pad: any) => (
              <Pad
                key={pad.id}
                color={
                  pad &&
                  pad.padStyles &&
                  pad.padStyles.length > 0 &&
                  pad.padStyles[0].color
                }
                style={
                  pad &&
                  pad.padStyles &&
                  pad.padStyles.length > 0 &&
                  pad.padStyles[0]
                }
                isNewPad={false}
                data={pad}
              />
            ))
          ) : searchPads.length === 0 ? (
            <div className="w-32 h-32 mx-auto mt-10">
              <div className="w-8 h-8 border-t-4 border-t-gray-700 border-l-4 border-l-white border-r-4 border-r-white border-b-white border-b-4  rounded-full animate-spin"></div>
            </div>
          ) : null}

          {!pads ? (
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-4xl font-bold text-gray-500">
                No notes found
              </h1>
              {/* create one */}
              <h1 className="text-md font-xl text-gray-800 mt-5">
                Hi <span className="font-bold"> {user.given_name}</span>! It
                seems like you&apos;re ready to start organizing your thoughts.
                You haven&apos;t created any{' '}
                <span className="font-bold">MindPads</span> yet. Why not get
                started now and create your first{' '}
                <span className="font-bold">MindPads</span>? It&apos;s a simple
                way to keep your ideas in one place. Just click on the{' '}
                <span className="font-bold">Plus Button</span> to get started!
              </h1>
            </div>
          ) : null}
        </div>

        {/* pagination */}
        {pads && pads.page && pads.page > 1 && searchPads.length === 0 ? (
          <div className="w-fit mt-5 m-auto">
            <Pagination page={pads.page} />
          </div>
        ) : null}
      </div>
    </>
  );
}

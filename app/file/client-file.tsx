'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const columns: GridColDef[] = [
  {
    field: 'fileName',
    headerName: 'File Name',
    width: 200,
    editable: true,
  },
  {
    field: 'fileType',
    headerName: 'File Type',
    width: 150,
    editable: false,
  },
  {
    field: 'filesize',
    headerName: 'File Size',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'url',
    headerName: 'File Link',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 1000,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    editable: false,
  },
];

export default function ClientFile({
  user,
  files,
  children,
}: {
  user: any;
  files: any;
  children: any;
}) {
  const [isprofilemenuopen, setisprofilemenuopen] = useState<boolean>(false);

  const modalRef = useRef(null);
  if (files && files.pad && files.pad.length > 0) {
    files.pad.forEach((file: any) => {
      file.createdAt = format(new Date(file.createdAt), 'PPpp');
    });
  }

  useOutsideClick(() => {
    setisprofilemenuopen(false);
  }, modalRef);

  return (
    <div className="mt-10 ml-24 mr-5">
      {/* profile */}
      <div className="ml-auto mr-0 w-fit relative">
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
      {/*  */}
      <div className="mt-5 mb-2">
        <h1 className=" text-5xl font-extrabold text-gray-800">Files</h1>
      </div>
      {files && files.pad && files.pad.length > 0 ? (
        <div className=" mt-5">
          <Box sx={{ height: 'full', width: '100%' }}>
            <DataGrid
              rows={files && files.pad}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      ) : (
        <div>
          <h1>No files found.</h1>
        </div>
      )}
    </div>
  );
}

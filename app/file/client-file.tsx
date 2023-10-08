'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';

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

export default function ClientFile({ user, files }: { user: any; files: any }) {
  if (files && files.pad && files.pad.length > 0) {
    files.pad.forEach((file: any) => {
      file.createdAt = format(new Date(file.createdAt), 'PPpp');
    });
  }

  return (
    <div className="mt-10 ml-24 mr-5">
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

'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'fileName',
    headerName: 'File Name',
    width: 150,
    editable: false,
  },
  {
    field: 'fileType',
    headerName: 'File Type',
    width: 150,
    editable: false,
  },
  {
    field: 'fileSize',
    headerName: 'File Size',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'download',
    headerName: 'Download',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: false,
  },
  {
    field: 'link',
    headerName: 'File Link',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: false,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function ClientFile({ user, files }: { user: any, files: any }) {
  return (
    <div className="mt-10 ml-24 mr-5">
      <div>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

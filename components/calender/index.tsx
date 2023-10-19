import * as React from 'react';
import format from 'date-fns/format';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parseISO } from 'date-fns';

export default function Calender({ dateSearch }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={['DatePicker']}>
        <DemoItem>
          <DatePicker
            onChange={(value) => {
              dateSearch(value);
            }}
            defaultValue={parseISO(format(new Date(), 'yyyy-dd-MM'))}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

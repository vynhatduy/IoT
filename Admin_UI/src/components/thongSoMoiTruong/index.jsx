import * as React from 'react';
import PropTypes from 'prop-types';
import { useDemoRouter } from '@toolpad/core/internal';
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PageContent from './pageContent';

const NAVIGATION = [
  { segment: '', title: 'Thời tiết' },
  { segment: 'orders', title: 'Orders' },
];

// Custom Toolbar Component
function CustomPageToolbar({ status }) {
  return (
    <PageHeaderToolbar>
      <p>Trạng thái hiện tại: {status}</p>
      <Button startIcon={<FileDownloadIcon />} color="inherit">
        Xuất
      </Button>

      <DateRangePicker
        sx={{ width: 220 }}
        defaultValue={[dayjs(), dayjs().add(14, 'day')]}
        slots={{ field: SingleInputDateRangeField }}
        slotProps={{ field: { size: 'small' } }}
        label="Period"
      />
    </PageHeaderToolbar>
  );
}

CustomPageToolbar.propTypes = {
  status: PropTypes.string.isRequired,
};

// Custom Header Component
function CustomPageHeader({ status }) {
  const CustomPageToolbarComponent = React.useCallback(
    () => <CustomPageToolbar status={status} />,
    [status]
  );

  return <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />;
}

CustomPageHeader.propTypes = {
  status: PropTypes.string.isRequired,
};

// Main Page Container Component
export default function ActionsPageContainer() {
  const {router} = useDemoRouter();
  const status = 'Active';
  const theme = useTheme();

  const CustomPageHeaderComponent = React.useCallback(
    () => <CustomPageHeader status={status} />,
    [status]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
        <Paper sx={{ width: '100%'}}>
          <PageContainer slots={{ header: CustomPageHeaderComponent }}>
            <PageContent />
          </PageContainer>
        </Paper>
      </AppProvider>
    </LocalizationProvider>
  );
}

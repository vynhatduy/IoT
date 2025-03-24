import PropTypes from 'prop-types';
// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// project imports
import MainCard from '../../components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra }) {
  const getStatusMessage = (title, value) => {
    switch (title) {
      case 'Độ ẩm (%)':
        if (value > 80) return 'Độ ẩm cao!';
        if (value < 30) return 'Độ ẩm thấp!';
        return 'Độ ẩm ổn định.';
      case 'Nhiệt độ (°C)':
        if (value > 30) return 'Nhiệt độ cao!';
        if (value < 18) return 'Trời lạnh!';
        return 'Nhiệt độ bình thường.';
      case 'Ánh sáng (lux)':
        if (value > 80) return 'Ánh sáng yếu!';
        if (value < 30) return 'Ánh sáng mạnh!';
        return 'Ánh sáng vừa phải.';
      case 'Chất lượng không khí (AQI)':
        if (value > 700) return 'Ô nhiễm cực cao';
        if (value > 500) return 'Ô nhiễm nặng';
        if (value > 300) return 'Ô nhiễm rõ rệt';
        if (value > 200) return 'Không khí hơi ô nhiễm';
        if (value > 100) return 'Không khí trong lành';
        return 'Không khí trong lành ✅';
      default:
        return '';
    }
  };
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid>
              <Chip
                variant="combined"
                color={color}
                icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
        <Typography variant="caption" color="text.secondary">
          {getStatusMessage(title, count)}
        </Typography>
      </Stack>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};

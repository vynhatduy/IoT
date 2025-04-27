// material-ui
import Stack from '@mui/material/Stack';
import TeamDevelop from '../components/team-develop';

export default function Footer() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 0px', mt: 'auto' }}>
      <TeamDevelop />
    </Stack>
  );
}

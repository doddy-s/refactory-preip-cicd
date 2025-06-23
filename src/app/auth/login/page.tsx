import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { APP_DASHBOARD } from '@/constants';
import MediverseLogoSm from '@/../public/ic-logo-mediverse-sm.png';
import DoctorImage from '@/../public/doctor.png';
import Image from 'next/image';
import { LoginForm } from './components/LoginForm';

export default async function LoginPage() {

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect(APP_DASHBOARD);
  }

  return (
    <Container component="main" className="w-screen h-screen" maxWidth={false}>
      <Image src={MediverseLogoSm} alt="mediverse-logo" className='absolute top-10 left-10'/>
      <Box className="flex items-start justify-center size-full">
        <Box className="h-full w-full lg:w-1/2 flex flex-col justify-center items-center p-12 lg:p-24 xl:p-48 gap-8">
          <Box className="w-full">
            <Typography component="h1" variant="h3" className="mb-4">
            Selamat Datang
            </Typography>
            <Typography component="h1" variant="h6" className="mb-4">
            Masuk dan kelola dashboard Mediverse anda sekarang
            </Typography>
          </Box>

          <LoginForm />
        </Box>
        <Box className="h-full w-full lg:w-1/2 hidden lg:flex justify-center items-center p-4 md:p-8">
          <Box
            className="h-full w-full rounded-3xl flex flex-col items-center justify-evenly p-4 md:p-8 lg:p-12"
            style={{ background: 'linear-gradient(to bottom, #311d74, #a02dbc)' }}
          >
            <Image
              src={MediverseLogoSm}
              alt="mediverse-logo"
              className="scale-150"
            />
            <Image
              src={DoctorImage}
              alt="doctor"
              className="h-1/2 w-1/2 aspect-auto"
            />
            <Typography
              variant="h3"
              className="text-white text-center"
            >
              Your Personal Health Assistant
            </Typography>
          </Box>
        </Box>

      </Box>
    </Container>
  );
}

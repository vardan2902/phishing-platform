import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    build: { sourcemap: true },
    define: {
      'process.env': {
        VITE_BASE_URL: env.VITE_BASE_URL,
      },
    },
  });
};

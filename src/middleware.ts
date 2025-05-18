import { auth } from '@/auth';

export default auth(req => {
  // Callback é chamado após a autenticação
});

export const config = {
  matcher: ['/dashboard/:path*', '/clientes/:path*', '/processos/:path*', '/agenda/:path*'],
};

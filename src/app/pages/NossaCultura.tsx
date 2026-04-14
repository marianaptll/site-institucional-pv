import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function NossaCultura() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '68px', minHeight: 'calc(100vh - 68px)' }} />
      <Footer />
    </>
  );
}

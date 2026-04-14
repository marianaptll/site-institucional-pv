import SpaceBox from './ui/space-box';

export function CTABanner() {
  return (
    <section
      className="relative w-full py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="relative z-10">
        <SpaceBox
          animatedText="Consulta gratuita • Sem compromisso • Especialistas disponíveis"
          starDensity="high"
          className="cursor-pointer"
        />
      </div>
    </section>
  );
}

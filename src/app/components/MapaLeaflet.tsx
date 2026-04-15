interface MapaLeafletProps {
  lat: number;
  lng: number;
}

export function MapaLeaflet({ lat, lng }: MapaLeafletProps) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <iframe
      src={src}
      title="Localização no Google Maps"
      width="100%"
      height="100%"
      style={{ border: 0, display: 'block' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

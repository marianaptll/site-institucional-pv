export type Noticia = {
  id: string;
  veiculo: string;
  tag: string;
  data: string;
  local: string;
  titulo: string;
  href: string;
  imagem: string | null;
  objectPosition?: string;
  destaque?: boolean;
};

export const NOTICIAS: Noticia[] = [
  {
    id: '1',
    veiculo: 'CBN Vale',
    tag: 'Rádio / Digital',
    data: '17 Abr 2026',
    local: 'São José dos Campos, SP',
    titulo: 'Empresa de consórcios abre vagas para vendedores em São José dos Campos',
    href: 'https://www.cbnvale.com.br/empresa-de-consorcios-abre-vagas-para-vendedores-em-sao-jose-dos-campos/',
    imagem: 'https://www.cbnvale.com.br/wp-content/uploads/2026/04/site-CBN-foto-34-1024x683.png',
    objectPosition: 'center',
  },
  {
    id: '2',
    veiculo: 'O Vale · Sampi',
    tag: 'Digital',
    data: '16 Abr 2026',
    local: 'São José dos Campos, SP',
    titulo: 'Corretora Porto Vale abre 120 vagas para vendedores em São José',
    href: 'https://sampi.net.br/ovale/noticias/2974241/cidades/2026/04/corretora-porto-vale-abre-120-vagas-para-vendedores-em-sao-jose',
    imagem: 'https://sampi.net.br/dir-arquivo-imagem/2026/04/5f05beefdddaecbbf0154d6da5834ffb.jpeg',
    objectPosition: 'center',
  },
  {
    id: '3',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '7 Abr 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Porto Vale acelera crescimento e registra alta de 80% em março',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/04/07/porto-vale-acelera-crescimento-e-registra-alta-de-80percent-em-marco.ghtml',
    imagem: '/imagens/materia1.avif',
    objectPosition: 'center',
    destaque: true,
  },
  {
    id: '4',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '27 Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Mudanças no Minha Casa Minha Vida ampliam acesso à casa própria',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/03/27/mudancas-no-minha-casa-minha-vida-ampliam-acesso-a-casa-propria.ghtml',
    imagem: 'https://s2-g1.glbimg.com/E5fGhiJ8xqDXLYOSji1PeVUaiU8=/0x0:1600x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/z/G/ZLwz2lTkKmstQj53TdAA/whatsapp-image-2026-03-26-at-16.45.55.jpeg',
  },
  {
    id: '5',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '22 Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Copom reduz Selic e consórcio se mantém como estratégia para a casa própria',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/03/22/copom-reduz-selic-e-consorcio-se-mantem-como-estrategia-para-a-casa-propria.ghtml',
    imagem: '/imagens/materia2.avif',
    objectPosition: 'center 80%',
  },
  {
    id: '6',
    veiculo: 'Meon',
    tag: 'Digital',
    data: '9 Mar 2026',
    local: 'São José dos Campos, SP',
    titulo: 'Porto Vale alcança 600 colaboradores e registra crescimento de 54% em créditos de consórcio',
    href: 'https://www.meon.com.br/noticias/vale-do-paraiba-regiao/sao-jose-dos-campos/porto-vale-alcanca-600-colaboradores-e-registra-crescimento-de-54-em-creditos-de-consorcio',
    imagem: 'https://media.meon.com.br/meon-media/wp-content/uploads/2026/04/porto-vale-902076.avif',
    objectPosition: 'center',
  },
  {
    id: '7',
    veiculo: 'G1 Globo',
    tag: 'Especial Publicitário',
    data: '9 Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'De 4 a 600 colaboradores: Porto Vale reforça liderança em consórcios e seguros',
    href: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/especial-publicitario/ep-porto-vale-consorcio/noticia/2026/03/09/de-4-a-600-colaboradores-porto-vale-reforca-lideranca-em-consorcios-e-seguros.ghtml',
    imagem: '/imagens/materia3.avif',
    objectPosition: 'center',
  },
  {
    id: '8',
    veiculo: 'Portal Aqui Vale',
    tag: 'Digital',
    data: 'Mar 2026',
    local: 'Vale do Paraíba, SP',
    titulo: 'Porto Vale chega a 600 colaboradores e amplia operação no país',
    href: 'https://portalaquivale.com.br/porto-vale-chega-a-600-colaboradores-e-amplia-operacao-no-pais/',
    imagem: 'https://portalaquivale.com.br/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-09-at-10.51.05.webp',
  },
  {
    id: '9',
    veiculo: 'YouTube',
    tag: 'Vídeo',
    data: '2026',
    local: 'São José dos Campos, SP',
    titulo: 'Aqui Empreende com Fernando Gianjiope — Porto Vale Consórcio',
    href: 'https://www.youtube.com/watch?v=pwPQD-DZU3s',
    imagem: 'https://img.youtube.com/vi/pwPQD-DZU3s/maxresdefault.jpg',
    objectPosition: 'center',
  },
];

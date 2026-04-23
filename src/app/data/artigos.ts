export type Bloco =
  | { tipo: 'p'; texto: string }
  | { tipo: 'h2'; texto: string }
  | { tipo: 'h3'; texto: string }
  | { tipo: 'lista'; itens: string[] }
  | { tipo: 'destaque'; texto: string }
  | { tipo: 'citacao'; texto: string; autor?: string };

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  leitura: number;
  destaque?: boolean;
  image: string | null;
  conteudo: Bloco[];
};

export const CATEGORIA_CORES: Record<string, { bg: string; text: string; dot: string }> = {
  'Imóveis':      { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  'Planejamento': { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  'Mercado':      { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Lances':       { bg: '#FDF4FF', text: '#7E22CE', dot: '#A855F7' },
  'Veículos':     { bg: '#F0F9FF', text: '#0369A1', dot: '#0EA5E9' },
  'Investimento': { bg: '#FEFCE8', text: '#854D0E', dot: '#EAB308' },
  'Guia':         { bg: '#F8FAFC', text: '#475569', dot: '#94A3B8' },
};

export const GRADIENTES: Record<string, string> = {
  'Imóveis':      'linear-gradient(135deg, #1e3a5f 0%, #009cde 100%)',
  'Planejamento': 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
  'Mercado':      'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)',
  'Lances':       'linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)',
  'Veículos':     'linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)',
  'Investimento': 'linear-gradient(135deg, #713f12 0%, #eab308 100%)',
  'Guia':         'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
};

export function getCor(cat: string) {
  return CATEGORIA_CORES[cat] ?? { bg: '#F3F4F6', text: '#374151', dot: '#9CA3AF' };
}

export function getGradiente(cat: string) {
  return GRADIENTES[cat] ?? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
}

export const ARTIGOS: Artigo[] = [
  {
    slug: 'baixa-selic-conquistar-imovel',
    titulo: 'Como aproveitar a baixa da Selic para conquistar seu imóvel?',
    resumo: 'Com a queda da taxa básica de juros, o consórcio imobiliário se torna ainda mais competitivo. Entenda por que este é o momento certo para planejar a compra do seu imóvel sem pagar juros.',
    categoria: 'Imóveis',
    data: '10/04/2026',
    leitura: 6,
    destaque: true,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'A taxa Selic, definida pelo Banco Central do Brasil, é o principal instrumento de política monetária do país. Quando ela cai, o crédito fica mais barato — e o mercado imobiliário sente esse efeito diretamente. Mas existe uma alternativa que independe da Selic para ser vantajosa: o consórcio imobiliário.' },
      { tipo: 'h2', texto: 'O que muda quando a Selic cai?' },
      { tipo: 'p', texto: 'Quando a Selic recua, os bancos tendem a reduzir as taxas de financiamento imobiliário. Em teoria, isso facilita o acesso ao crédito. Na prática, porém, as taxas ainda ficam bem acima de zero — e os juros continuam sendo um custo real que você paga durante décadas. Um financiamento de R$ 400.000 a 10% ao ano pode custar mais de R$ 800.000 ao final de 30 anos.' },
      { tipo: 'h2', texto: 'Por que o consórcio não tem juros?' },
      { tipo: 'p', texto: 'No consórcio, você não paga juros. Em vez disso, os participantes de um grupo formam uma poupança coletiva e, todo mês, um ou mais membros são contemplados com a carta de crédito — seja por sorteio ou lance. A única cobrança é a taxa de administração, que costuma ser muito inferior ao total de juros pago em um financiamento.' },
      { tipo: 'destaque', texto: 'No consórcio, você compra pelo preço real do imóvel. No financiamento, você compra pelo preço real mais os juros dos próximos 20 ou 30 anos.' },
      { tipo: 'h2', texto: 'Consórcio x Financiamento: compare os números' },
      { tipo: 'lista', itens: [
        'Financiamento a 9% a.a.: parcela inicial de ~R$ 3.600 para um crédito de R$ 400.000 em 30 anos; total pago: ~R$ 870.000',
        'Consórcio: parcela mensal de ~R$ 1.900 (220 meses); total pago: ~R$ 418.000 incluindo taxa de administração',
        'Diferença: economia potencial de até R$ 450.000 ao longo do prazo',
      ]},
      { tipo: 'h2', texto: 'Quem se beneficia mais com o consórcio?' },
      { tipo: 'p', texto: 'Quem não precisa do imóvel de forma imediata. O consórcio é ideal para quem está planejando a compra com antecedência — seja para sair do aluguel em 2 ou 3 anos, seja para investir no imóvel antes da aposentadoria.' },
      { tipo: 'h3', texto: 'Perfil ideal para o consórcio imobiliário' },
      { tipo: 'lista', itens: [
        'Quem está no aluguel e consegue manter a parcela do consórcio',
        'Investidores que querem diversificar o patrimônio imobiliário',
        'Quem tem capital para dar um lance e antecipar a contemplação',
        'Profissionais autônomos com renda variável que preferem menor comprometimento mensal',
      ]},
      { tipo: 'h2', texto: 'Como dar o primeiro passo' },
      { tipo: 'p', texto: 'Entre em contato com um consultor da Porto Vale. Vamos apresentar as opções de grupo disponíveis, simular o valor das parcelas e te ajudar a escolher o prazo ideal para o seu planejamento — tudo sem compromisso.' },
    ],
  },
  {
    slug: 'poupanca-forcada-2026',
    titulo: 'Como usar o consórcio para fazer uma poupança forçada em 2026?',
    resumo: 'Disciplina financeira é difícil. Veja como o consórcio funciona como uma ferramenta automática de poupança que garante seu patrimônio no longo prazo.',
    categoria: 'Planejamento',
    data: '05/04/2026',
    leitura: 5,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'Guardar dinheiro exige disciplina. E disciplina, na prática, é o maior desafio financeiro para a maioria dos brasileiros. Pesquisas mostram que mais de 70% das pessoas que tentam criar uma reserva financeira voluntária desistem antes de completar um ano. O consórcio resolve esse problema de uma forma elegante: ele torna a poupança obrigatória.' },
      { tipo: 'h2', texto: 'O que é poupança forçada?' },
      { tipo: 'p', texto: 'Poupança forçada é qualquer mecanismo que retire o dinheiro da sua conta antes que você tenha chance de gastar. O exemplo mais claro é o FGTS: você não decide guardar, simplesmente acontece todo mês. O consórcio funciona da mesma forma — a parcela sai automaticamente, e o compromisso já está assumido.' },
      { tipo: 'h2', texto: 'Como o consórcio funciona como poupança forçada' },
      { tipo: 'p', texto: 'Ao entrar em um grupo de consórcio, você assume o compromisso de pagar uma parcela mensal por um prazo definido. Esse valor vai para um fundo coletivo e, ao ser contemplado, você recebe uma carta de crédito no valor do bem contratado. Se pagar regularmente por 5 anos, no final terá construído um patrimônio sem precisar de força de vontade diária.' },
      { tipo: 'destaque', texto: 'As parcelas do consórcio funcionam como uma conta de poupança forçada que, no final, entrega um ativo real — não apenas um saldo bancário que pode ser sacado e gasto.' },
      { tipo: 'h2', texto: 'Vantagens em relação à poupança tradicional' },
      { tipo: 'lista', itens: [
        'Rendimento protegido: a carta de crédito é corrigida pelo mesmo índice que reajusta as parcelas',
        'Comprometimento real: a parcela é uma obrigação contratual, não uma opção',
        'Sem tentação: o valor fica no fundo coletivo, fora do seu controle imediato',
        'Ativo no final: você recebe um bem concreto — imóvel, veículo ou outro — não só dinheiro',
      ]},
      { tipo: 'h2', texto: 'O que fazer em 2026' },
      { tipo: 'p', texto: 'Com o cenário econômico atual, 2026 é um excelente momento para iniciar um consórcio. As taxas de administração estão competitivas, e os grupos disponíveis oferecem prazos e valores acessíveis para diferentes perfis. Quanto antes você começar, menor será o tempo até a contemplação.' },
      { tipo: 'h3', texto: 'Dica prática' },
      { tipo: 'p', texto: 'Alinhe o valor da parcela do consórcio com o que você já paga de aluguel. Se a parcela for próxima ao aluguel, a mudança no orçamento é mínima — e ao ser contemplado, você para de pagar aluguel e passa a construir patrimônio próprio.' },
    ],
  },
  {
    slug: 'consorcio-casa-patrimonio-2026',
    titulo: 'Consórcio de casa: conquiste seu patrimônio em 2026',
    resumo: 'Descubra como planejar a compra da sua casa própria com consórcio, sem entrada e sem juros. Um guia prático para quem quer sair do aluguel este ano.',
    categoria: 'Imóveis',
    data: '28/03/2026',
    leitura: 7,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'Sair do aluguel é o sonho de milhões de brasileiros. Em 2026, com um planejamento bem feito, isso pode se tornar uma realidade mais acessível do que você imagina. O consórcio imobiliário é uma das ferramentas mais eficientes para conquistar a casa própria sem comprometer o orçamento com juros elevados.' },
      { tipo: 'h2', texto: 'Por que 2026 é um bom momento?' },
      { tipo: 'p', texto: 'O mercado de consórcios está em expansão. Segundo dados do Banco Central, o sistema registrou recordes de novas cotas em 2025, e 2026 deve manter esse ritmo. Mais grupos disponíveis significa mais opções para você escolher o prazo e o valor ideal para seu perfil financeiro.' },
      { tipo: 'h2', texto: 'Como funciona o consórcio imobiliário' },
      { tipo: 'p', texto: 'Você entra em um grupo com outros participantes que têm o mesmo objetivo. Todos pagam uma parcela mensal, que vai para um fundo coletivo. A cada mês, um ou mais participantes são contemplados com uma carta de crédito — por sorteio ou lance — e podem usar esse valor para comprar o imóvel.' },
      { tipo: 'lista', itens: [
        'Sem juros: você paga apenas a taxa de administração',
        'Prazo: de 60 a 240 meses, dependendo do grupo',
        'Valores: cartas de crédito a partir de R$ 100.000',
        'Flexibilidade: imóvel pronto, na planta, terreno, construção ou quitação de financiamento existente',
      ]},
      { tipo: 'h2', texto: 'Quem pode participar?' },
      { tipo: 'p', texto: 'Qualquer pessoa maior de 18 anos com renda suficiente para pagar a parcela mensal. Diferente do financiamento bancário, o consórcio não exige comprovação de renda rígida nem análise de crédito no momento da adesão — a análise ocorre apenas na contemplação, quando você for usar a carta de crédito.' },
      { tipo: 'h2', texto: 'Lance: como antecipar sua contemplação' },
      { tipo: 'p', texto: 'Se você tem uma reserva financeira, pode usar o lance para antecipar a contemplação. O lance é um valor que você oferece além das parcelas normais, e o participante que oferecer o maior percentual sobre o crédito total é contemplado naquele mês.' },
      { tipo: 'h3', texto: 'Tipos de lance mais comuns' },
      { tipo: 'lista', itens: [
        'Lance livre: você define o valor; o maior percentual vence',
        'Lance fixo: percentual definido pela administradora; empate é resolvido por sorteio entre os ofertantes',
        'Lance embutido: você usa parte do próprio crédito como lance, reduzindo o valor da carta recebida',
      ]},
      { tipo: 'h2', texto: 'Passo a passo para começar' },
      { tipo: 'lista', itens: [
        '1. Defina o valor do imóvel que deseja comprar',
        '2. Calcule quanto pode pagar de parcela por mês',
        '3. Escolha o prazo que encaixa no seu planejamento',
        '4. Entre em contato com a Porto Vale para conhecer os grupos disponíveis',
        '5. Assine o contrato e comece a construir seu patrimônio',
      ]},
    ],
  },
  {
    slug: 'tipos-de-lance-como-escolher',
    titulo: 'Quais os tipos de lance e como escolher para você?',
    resumo: 'Lance livre, fixo ou embutido — cada modalidade tem suas vantagens. Aprenda a calcular o melhor tipo de lance para ser contemplado mais rápido no seu grupo.',
    categoria: 'Lances',
    data: '20/03/2026',
    leitura: 8,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'Ser contemplado por sorteio pode levar meses ou anos. O lance é a estratégia que acelera esse processo — mas existem três modalidades diferentes, cada uma com suas regras, vantagens e limitações. Entender como funcionam é essencial para usar o lance da forma mais inteligente possível.' },
      { tipo: 'h2', texto: 'O que é um lance no consórcio?' },
      { tipo: 'p', texto: 'O lance é uma oferta de pagamento antecipado que o consorciado faz em uma assembleia mensal. Quem oferecer o maior percentual sobre o valor total do crédito é contemplado naquele mês e recebe sua carta. É, essencialmente, uma forma de antecipar a sua vez na fila.' },
      { tipo: 'h2', texto: 'Lance livre' },
      { tipo: 'p', texto: 'O mais comum e flexível. Você define livremente o valor que quer oferecer, dentro dos limites estabelecidos pelo regulamento do grupo. Geralmente é calculado como percentual sobre o valor total da carta de crédito.' },
      { tipo: 'lista', itens: [
        'Vantagem: controle total sobre o valor ofertado',
        'Desvantagem: concorrência direta com outros membros do grupo',
        'Estratégia: pesquise o histórico de lances para definir um percentual competitivo sem pagar mais do que o necessário',
      ]},
      { tipo: 'h3', texto: 'Como calcular um lance livre competitivo' },
      { tipo: 'p', texto: 'A maioria dos grupos tem um histórico de lances médios. Peça ao seu consultor da Porto Vale o relatório das últimas assembleias — isso te dá uma base real para oferecer um lance com boa chance de sucesso.' },
      { tipo: 'h2', texto: 'Lance fixo' },
      { tipo: 'p', texto: 'Nesta modalidade, a administradora define um percentual fixo — por exemplo, 30% do crédito. Todos que quiserem tentar o lance fixo pagam o mesmo valor. Em caso de empate, a contemplação é decidida por sorteio entre os ofertantes.' },
      { tipo: 'lista', itens: [
        'Vantagem: previsibilidade — você sabe exatamente quanto vai desembolsar',
        'Desvantagem: menos controle sobre a contemplação (sorteio em caso de empate)',
        'Ideal para: quem tem o valor disponível e quer uma chance extra além do sorteio normal',
      ]},
      { tipo: 'h2', texto: 'Lance embutido' },
      { tipo: 'p', texto: 'Uma modalidade criativa e muito útil para quem não tem reserva financeira disponível no momento. No lance embutido, você usa uma parte do próprio crédito como lance. Em vez de receber R$ 400.000 de carta, você oferece R$ 80.000 (20%) como lance e, se contemplado, recebe R$ 320.000.' },
      { tipo: 'destaque', texto: 'O lance embutido é a solução para quem quer antecipar a contemplação sem precisar ter dinheiro guardado. Você usa o próprio crédito como alavanca.' },
      { tipo: 'lista', itens: [
        'Vantagem: sem desembolso extra para o lance',
        'Desvantagem: você recebe um crédito menor do que o valor contratado',
        'Ideal para: quem precisa ser contemplado mais rápido mas não tem reservas disponíveis',
      ]},
      { tipo: 'h2', texto: 'Como escolher o tipo certo para você' },
      { tipo: 'h3', texto: 'Perguntas que você deve responder antes de decidir' },
      { tipo: 'lista', itens: [
        'Tenho reserva financeira disponível? → Lance livre ou fixo',
        'Não tenho reservas mas preciso ser contemplado logo? → Lance embutido',
        'Quero máximo controle sobre o valor? → Lance livre',
        'Prefiro previsibilidade de valor? → Lance fixo',
      ]},
      { tipo: 'citacao', texto: 'A melhor estratégia de lance é aquela que se encaixa na sua realidade financeira hoje — não a que parece mais inteligente no papel.' },
      { tipo: 'h2', texto: 'Quando vale a pena esperar o sorteio?' },
      { tipo: 'p', texto: 'Se você não tem pressa, o sorteio é sempre uma opção válida. Com o tempo, a probabilidade de contemplação aumenta, especialmente em grupos com muitos participantes já contemplados. Em alguns casos, aguardar pelo sorteio é mais econômico do que desembolsar um lance alto.' },
    ],
  },
  {
    slug: 'sistema-consorcios-58-milhoes-2025',
    titulo: 'Sistema de consórcios registra 5,8 milhões de cotas vendidas em 2025',
    resumo: 'O mercado de consórcios bate novo recorde histórico. Veja os dados do Banco Central e o que esse crescimento significa para quem está planejando entrar em um grupo.',
    categoria: 'Mercado',
    data: '14/03/2026',
    leitura: 4,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'O sistema de consórcios brasileiro encerrou 2025 com um marco histórico: 5,8 milhões de novas cotas vendidas, segundo dados divulgados pelo Banco Central do Brasil. O crescimento foi de 11,4% em relação ao ano anterior, consolidando o consórcio como uma das principais ferramentas de crédito e planejamento patrimonial do país.' },
      { tipo: 'h2', texto: 'Os números do mercado' },
      { tipo: 'lista', itens: [
        '5,8 milhões de novas cotas vendidas em 2025',
        'Crescimento de 11,4% em relação a 2024',
        'Volume total de crédito comercializado: R$ 310 bilhões',
        'Segmento imobiliário: maior crescimento, com alta de 18%',
        'Automóveis: segundo maior segmento, crescimento de 9%',
      ]},
      { tipo: 'h2', texto: 'O que está por trás desse crescimento?' },
      { tipo: 'p', texto: 'Três fatores explicam o desempenho recorde do setor. Primeiro, o aumento das taxas de juros dos financiamentos tradicionais, que tornou o crédito bancário mais caro e empurrou consumidores em busca de alternativas sem juros. Segundo, a digitalização do setor, que simplificou o processo de adesão e tornou a gestão dos grupos mais transparente. Terceiro, a maior conscientização financeira da população.' },
      { tipo: 'h2', texto: 'O papel das administradoras regionais' },
      { tipo: 'p', texto: 'Enquanto os grandes bancos concentram parte do mercado, as administradoras independentes têm crescido de forma expressiva por oferecer atendimento personalizado e maior flexibilidade. Em regiões onde a presença bancária é menor, as administradoras regionais são a principal porta de entrada ao sistema.' },
      { tipo: 'destaque', texto: 'O consórcio se consolidou como a segunda maior modalidade de crédito do Brasil, atrás apenas do financiamento imobiliário bancário.' },
      { tipo: 'h2', texto: 'O que esse crescimento significa para você?' },
      { tipo: 'p', texto: 'Mais participantes no sistema significam grupos maiores, mais opções de crédito e maior liquidez para quem deseja vender ou transferir sua cota. Para quem está planejando entrar agora, é um sinal de que o mercado está maduro, regulado e com ampla oferta de grupos disponíveis.' },
    ],
  },
  {
    slug: 'porto-vale-guia-consorcio',
    titulo: 'A Porto Vale e o Guia do Consórcio: tudo que você precisa saber',
    resumo: 'Reunimos as principais dúvidas de quem está começando no mundo dos consórcios. Um material completo para você tomar a melhor decisão.',
    categoria: 'Guia',
    data: '07/03/2026',
    leitura: 10,
    image: null,
    conteudo: [
      { tipo: 'p', texto: 'O consórcio existe no Brasil desde os anos 1960 e já ajudou milhões de pessoas a conquistar bens importantes — casa, carro, moto, equipamentos agrícolas e muito mais. Mas ainda hoje é um dos produtos financeiros mais mal compreendidos pelo público em geral. Este guia foi criado para responder as dúvidas mais comuns de quem está considerando entrar em um grupo.' },
      { tipo: 'h2', texto: 'O que é consórcio?' },
      { tipo: 'p', texto: 'Consórcio é uma modalidade de compra coletiva. Um grupo de pessoas com o mesmo objetivo — comprar um imóvel, um carro ou outro bem — se reúne e contribui com parcelas mensais para um fundo comum. Todo mês, um ou mais participantes são contemplados e recebem uma carta de crédito para adquirir o bem desejado.' },
      { tipo: 'p', texto: 'Diferente do financiamento, não há cobrança de juros. A remuneração da administradora ocorre por uma taxa de administração, diluída nas parcelas ao longo do prazo contratado.' },
      { tipo: 'h2', texto: 'Como funciona um grupo de consórcio?' },
      { tipo: 'lista', itens: [
        'O grupo é formado por pessoas com o mesmo tipo de bem e faixa de crédito',
        'Todos pagam parcelas mensais dentro do prazo contratado',
        'A cada assembleia mensal, contemplações ocorrem por sorteio e/ou lance',
        'O contemplado recebe a carta de crédito e a usa para adquirir o bem',
        'Os demais continuam pagando até serem contemplados ou o grupo encerrar',
      ]},
      { tipo: 'h2', texto: 'Quem administra o consórcio?' },
      { tipo: 'p', texto: 'A administradora é a empresa responsável pela gestão do grupo: recebe as parcelas, organiza as assembleias, realiza os sorteios, analisa os lances e libera as cartas de crédito. No Brasil, todas as administradoras devem ser autorizadas e fiscalizadas pelo Banco Central do Brasil.' },
      { tipo: 'p', texto: 'A Porto Vale atua como representante autorizada de administradoras reguladas pelo Banco Central, sendo o ponto de contato entre o cliente e o grupo de consórcio.' },
      { tipo: 'h2', texto: 'Como sou contemplado?' },
      { tipo: 'h3', texto: 'Por sorteio' },
      { tipo: 'p', texto: 'Todo mês, em assembleia, é realizado um sorteio entre todos os participantes não contemplados. A chance de contemplação aumenta a cada mês que passa, à medida que outros participantes vão sendo contemplados.' },
      { tipo: 'h3', texto: 'Por lance' },
      { tipo: 'p', texto: 'Você pode fazer uma oferta de pagamento antecipado chamada lance. O participante com o maior percentual de lance é contemplado naquele mês. Existem três modalidades: lance livre, fixo e embutido — cada uma com regras e vantagens específicas.' },
      { tipo: 'h2', texto: 'Quais são as taxas cobradas?' },
      { tipo: 'lista', itens: [
        'Taxa de administração: remunera a administradora pela gestão; entre 12% e 20% diluídos no prazo total',
        'Fundo de reserva: garante o grupo contra inadimplência; geralmente 2% a 5% do crédito total',
        'Seguro prestamista (opcional): protege as parcelas em caso de morte ou invalidez do titular',
      ]},
      { tipo: 'h3', texto: 'O que NÃO existe no consórcio' },
      { tipo: 'lista', itens: [
        'Juros sobre o crédito',
        'IOF (Imposto sobre Operações Financeiras)',
        'Entrada obrigatória',
      ]},
      { tipo: 'h2', texto: 'Quais tipos de consórcio a Porto Vale oferece?' },
      { tipo: 'lista', itens: [
        'Imóvel: apartamentos, casas, terrenos, construção e reforma',
        'Automóvel: carros novos e usados de até 5 anos',
        'Pesados: caminhões, ônibus e máquinas',
        'Agronegócio: tratores, implementos e equipamentos rurais',
        'Investimento: para fins de aplicação e crescimento patrimonial',
        'Placa solar: sistemas de energia fotovoltaica',
        'Empresarial: para pessoa jurídica',
      ]},
      { tipo: 'h2', texto: 'Perguntas frequentes' },
      { tipo: 'h3', texto: 'Posso desistir do consórcio?' },
      { tipo: 'p', texto: 'Sim. Consorciados não contemplados podem solicitar o cancelamento da cota. O valor pago é devolvido, descontadas as taxas de administração, conforme as regras do regulamento do grupo.' },
      { tipo: 'h3', texto: 'O que acontece se eu atrasar uma parcela?' },
      { tipo: 'p', texto: 'O atraso gera multa e juros moratórios conforme contrato. Após certo número de parcelas em aberto, a cota pode ser excluída do grupo. Por isso, é fundamental contratar um valor de parcela compatível com seu orçamento mensal.' },
      { tipo: 'h3', texto: 'Posso usar o FGTS no consórcio imobiliário?' },
      { tipo: 'p', texto: 'Sim. Ao ser contemplado com uma carta de crédito para imóvel, você pode usar o saldo do FGTS para complementar o valor, pagar parte do lance ou amortizar parcelas, desde que atenda aos requisitos da Caixa Econômica Federal.' },
      { tipo: 'citacao', texto: 'O consórcio não é para todo mundo — é para quem planeja. E quem planeja sempre chega lá.', autor: 'Equipe Porto Vale' },
    ],
  },
];

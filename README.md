# Dieta das 3 Fases — prévia editorial

Página estática, em português, adaptada ao layout de publicação usado como referência. Sem React, ferramentas de build ou dependências de instalação.

## Abrir e hospedar

O arquivo principal é **index.html**. Abra-o para revisar o layout. Para testar o vídeo, prefira uma hospedagem HTTP/HTTPS ou um servidor local, pois navegadores podem restringir embeds em arquivos `file://`.

Publique estes arquivos juntos, mantendo a estrutura:

```
index.html
style.css
script.js
player.html
player.js
assets/
  eduardo-claas.jpg
  comments/
    marina.webp
    lucas.webp
    renato.webp
    helena.webp
    rodrigo.webp
    diego.webp
    fernanda.webp
    andreia.webp
    mariana.webp
    cristina.webp
    felipe.webp
    beatriz.webp
    adriana.webp
    pedro.webp
    gustavo.webp
```

É compatível com hospedagem estática. Não há etapa de compilação. `README.md` e `COPY-E-ORIGEM.md` são documentação e não são necessários para executar a página.

## Conteúdo desta versão

- Foto de Eduardo Claas obtida do perfil público indicado pelo projeto.
- Cabeçalho com apenas Eduardo Claas; sem menção ao programa antes do vídeo.
- Headline curta em duas frases, com o gancho dos alimentos “saudáveis” e antecipação emocional. Sem a inserção “Há relatos de…” ou bloco separado de disclaimer abaixo da headline.
- Future pacing com a data do acesso + 30 dias corridos: imaginar o orgulho de ter começado, não prometer uma perda de peso até a data.
- Data de demonstração: dia anterior ao acesso e horário aleatório, acompanhados da indicação visível de simulação.
- 16 comentários/respostas ilustrativos, agrupados em 7 comentários principais e 9 respostas.
- Conversas exclusivamente entre usuários fictícios: ceticismo com detox, identificação, restrições permanentes, suplemento, rotina e continuidade. Não há falas da equipe.
- Estado azul do vídeo seguindo a referência, com o player real carregado apenas após o clique.
- Curtir e responder funcionam como demonstração local. Não há integração com Facebook nem publicação de comentários em servidor.

## Importante sobre os comentários

Esta é uma **prévia para aprovação de copy**, não um conjunto de depoimentos recebidos. Os nomes e falas criados estão identificados na própria página como exemplos. As fotos são avatares da página de referência, utilizados somente para avaliar o layout, sem vínculo com as falas criadas.

No arquivo `VSL - Zonulina.docx`, o bloco de depoimentos é uma orientação para inserir relatos na edição, sem transcrições identificadas. A página de vendas tem relatos publicados, mas eles não foram convertidos em novas falas ou atribuídos a pessoas fictícias nesta versão.

Para usar testemunhos reais, substitua os exemplos por relatos documentados e autorizados, preservando o sentido original. Não remova a identificação de ficção mantendo as falas inventadas como se fossem comentários autênticos. Confirme os direitos de uso das fotografias antes de uma campanha. A pessoa que aparece mais de uma vez mantém o mesmo retrato. Consulte `assets/ORIGEM.md`.

## Vídeo e dependências externas

Player identificado na página fornecida:

- Fornecedor: VTurb/Converteai.
- Player: `69f3aa5dc864fc4eeacc513f`.
- Configuração do embed: `player.js`.
- Endereço alternativo e carregamento após clique: `script.js`.
- Página isolada do embed: `player.html`.

A VSL fornecida usa proporção 3:4; ela é centralizada, sem cortar a imagem, dentro do quadro 9:16 da referência. As faixas pretas durante a reprodução são intencionais. O quadro azul inicial mantém 322 × 572,44 px no desktop.

Dependendo do histórico e das permissões de reprodução do navegador, o player VTurb pode apresentar sua própria confirmação de continuar/reiniciar depois do carregamento. Os controles nativos permanecem disponíveis.

Não foram copiados Meta Pixel, Google Analytics, Google Tag Manager, contadores de audiência ou scripts de publicidade da página original. O único serviço carregado após o clique é o fornecedor do vídeo, que pode carregar sua própria telemetria, recursos e botões configurados na conta VTurb. Portanto, não se deve interpretar esta entrega como garantia de ausência de rastreamento pelo fornecedor do player.

Os botões e destinos internos à VSL permanecem sob a configuração do player original. Esta página não cria uma nova oferta, preço, checkout ou temporização de compra.

## Layout e edição

- `style.css`: largura da coluna em `--content-width: 550px`; quadro do vídeo em `--player-width: 322px`.
- Breakpoints: 600 px e 350 px. No mobile, os textos aumentam para leitura e os recuos das respostas diminuem.
- `index.html`: headline, nome, descrição, aviso editorial e comentários. Cada comentário possui um ID entre `c01` e `c16`.
- Fontes de sistema; ícones vetoriais inline; imagens em `assets/`.
- A página está marcada com `noindex, nofollow` por ser uma prévia editorial.

## Datas dinâmicas

O calendário usa o fuso local do visitante e soma **30 dias corridos à data de acesso**. Não é “mês seguinte no mesmo dia” nem fim do mês. Exemplos: 16/09 → 16 de outubro; 31/10 → 30 de novembro; 31/12 → 30 de janeiro. O cálculo respeita meses com durações diferentes, anos bissextos e horário de verão.

A meta da headline fica fixa durante aquela abertura da página, inclusive se a aba atravessar a meia-noite. Cada nova abertura ou recarregamento calcula novamente a data de acesso + 30 dias. Não há prazo comercial ou contagem regressiva individual persistente.

A data da publicação é uma simulação de ontem, não uma data histórica do especialista. O horário é sorteado uma vez por dia e mantido durante a sessão da aba, inclusive ao recarregar, quando o navegador permite `sessionStorage`. Essa data de postagem se atualiza ao retornar à aba ou na verificação de um minuto, sem deslocar a meta calculada para a headline naquele acesso. Sem JavaScript, o texto permanece legível e não exibe uma data inventada fixa.

Para verificar o calendário, execute `node --test tests/dynamic-header.test.cjs`. Os testes cobrem viradas de mês e ano, ano bissexto, todos os horários e mudanças de horário de verão. Não há dependências de teste para instalar.

Veja `revisao/DEPOIMENTOS-FONTES.md` para os limites da consulta aos destaques e a origem dos números considerados nas versões anteriores. A headline atual não inclui números de perda de peso. Relatos publicados não foram tratados como verificação clínica independente nem como resultados típicos.

## Fontes

- Referência visual: print fornecido pelo projeto e [página modelo](https://fernandojardimnatural.online/v1/).
- Conteúdo: `VSL - Zonulina.docx`, fornecido pelo projeto.
- [Página de vendas e VSL](https://meufluxo.com/pv/eduardo-claas-dieta-das-3-fases-2-0-vsl8-organico/).
- [Perfil de Eduardo Claas](https://www.instagram.com/dreduardoclaas/).
- [API oficial do player](https://smartplayer.vturb.com/en/api/) e [eventos oficiais](https://smartplayer.vturb.com/en/events/).

As fontes foram consultadas em 16/09/2026. Alegações da VSL não foram tratadas como comprovação científica nem ampliadas na nova copy.

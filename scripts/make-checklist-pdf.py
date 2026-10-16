"""
Gera docs/Informacoes_Pendentes_Site_Hackathon.pdf: PDF editável SÓ com as informações que
ainda faltam no site, para a coordenação preencher e devolver.
Rodar: python scripts/make-checklist-pdf.py
"""
import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

WINE = HexColor('#7a1530')
NAVY = HexColor('#14336e')
INK = HexColor('#1b2233')
STONE = HexColor('#6b6460')
LINE = HexColor('#d9d3cf')
SOFT = HexColor('#f6f2f0')

FONTS = 'C:/Windows/Fonts'
pdfmetrics.registerFont(TTFont('Body', os.path.join(FONTS, 'segoeui.ttf')))
pdfmetrics.registerFont(TTFont('Bold', os.path.join(FONTS, 'segoeuib.ttf')))

SITE = 'https://hackathon-univassouras-marica.vercel.app'
W, H = A4
M = 46


class Doc:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle('Informações pendentes do site – Hackathon ESW & ADS 2026')
        self.c.setAuthor('Coordenação ESW/ADS – Univassouras Maricá')
        self.form = self.c.acroForm
        self.page = 0
        self.n = 0
        self.new_page()

    def new_page(self):
        if self.page:
            self.c.showPage()
        self.page += 1
        c = self.c
        c.setFillColor(INK)
        c.rect(0, H - 92, W, 92, stroke=0, fill=1)
        c.setFillColor(WINE)
        c.rect(0, H - 96, W * 0.55, 4, stroke=0, fill=1)
        c.setFillColor(NAVY)
        c.rect(W * 0.55, H - 96, W * 0.45, 4, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont('Bold', 19)
        c.drawString(M, H - 46, 'Informações pendentes para o site')
        c.setFont('Body', 10)
        c.setFillColor(HexColor('#c9c2be'))
        c.drawString(M, H - 66, 'Hackathon ESW & ADS 2026 · Univassouras Campus Maricá · 19 a 21/10/2026')
        c.drawRightString(W - M, H - 66, f'Página {self.page}')
        c.setFont('Body', 8)
        c.setFillColor(STONE)
        c.drawString(M, 26, f'Site: {SITE}')
        c.drawRightString(W - M, 26, 'PDF editável: preencha os campos e salve o arquivo')
        self.y = H - 120

    def need(self, h):
        if self.y - h < 46:
            self.new_page()

    def field(self, x, y, w, h, tip, multiline=False):
        self.n += 1
        self.form.textfield(
            name=f'campo_{self.n}', tooltip=tip, x=x, y=y, width=w, height=h,
            borderColor=LINE, fillColor=SOFT, textColor=INK, fontName='Helvetica', fontSize=9, borderWidth=1,
            fieldFlags='multiline' if multiline else '',
        )

    def section(self, num, title, hint=None):
        self.need(60)
        c = self.c
        self.y -= 6
        c.setFillColor(WINE)
        c.roundRect(M, self.y - 5, 22, 20, 4, stroke=0, fill=1)
        c.setFillColor(white)
        c.setFont('Bold', 10)
        c.drawCentredString(M + 11, self.y + 1, str(num))
        c.setFillColor(INK)
        c.setFont('Bold', 12.5)
        c.drawString(M + 32, self.y, title)
        self.y -= 15
        if hint:
            c.setFont('Body', 8.5)
            c.setFillColor(STONE)
            for ln in simpleSplit(hint, 'Body', 8.5, W - 2 * M - 32):
                c.drawString(M + 32, self.y, ln)
                self.y -= 11
        self.y -= 6

    def labeled(self, label, h=18, multiline=False, label_w=150):
        """Rótulo à esquerda + campo à direita."""
        lines = simpleSplit(label, 'Body', 9, label_w - 6)
        bh = max(h, 12 * len(lines) + 4)
        self.need(bh + 8)
        c = self.c
        c.setFont('Body', 9)
        c.setFillColor(INK)
        ty = self.y - 11
        for ln in lines:
            c.drawString(M + 32, ty, ln)
            ty -= 12
        x = M + 32 + label_w
        self.field(x, self.y - bh, W - M - x, bh, label, multiline)
        self.y -= bh + 8

    def table(self, headers, widths, rows, field_cols, row_h=24):
        """Tabela: colunas de texto fixo e colunas com campo editável."""
        c = self.c
        x0 = M + 32
        self.need(20 + row_h)
        c.setFillColor(SOFT)
        c.rect(x0, self.y - 16, sum(widths), 16, stroke=0, fill=1)
        c.setFont('Bold', 8)
        c.setFillColor(STONE)
        x = x0
        for hd, w in zip(headers, widths):
            c.drawString(x + 4, self.y - 11, hd.upper())
            x += w
        self.y -= 20
        for row in rows:
            # altura da linha conforme o texto fixo
            heights = [len(simpleSplit(str(v), 'Body', 8.5, w - 8)) for v, w in zip(row, widths) if v is not None]
            rh = max(row_h, 11 * max(heights or [1]) + 8)
            self.need(rh + 4)
            x = x0
            for i, (v, w) in enumerate(zip(row, widths)):
                if i in field_cols:
                    self.field(x + 2, self.y - rh + 2, w - 4, rh - 4, f'{headers[i]}: {row[0]}', multiline=True)
                else:
                    c.setFont('Body', 8.5)
                    c.setFillColor(INK)
                    ty = self.y - 11
                    for ln in simpleSplit(str(v), 'Body', 8.5, w - 8):
                        c.drawString(x + 4, ty, ln)
                        ty -= 11
                x += w
            c.setStrokeColor(LINE)
            c.line(x0, self.y - rh - 1, x0 + sum(widths), self.y - rh - 1)
            self.y -= rh + 3
        self.y -= 8

    def save(self):
        self.c.save()


def build(path):
    d = Doc(path)
    c = d.c

    # instrução
    c.setFont('Body', 9.5)
    c.setFillColor(INK)
    intro = (
        'Estas são as informações que ainda faltam no site do Hackathon. O restante já foi preenchido com os dados '
        'do edital e da programação enviada. Por favor, preencha os campos abaixo, salve o PDF e devolva. Itens que '
        'ainda não estiverem definidos podem ficar em branco.'
    )
    for ln in simpleSplit(intro, 'Body', 9.5, W - 2 * M):
        c.drawString(M, d.y, ln)
        d.y -= 13
    d.y -= 6
    c.setFont('Bold', 9)
    c.drawString(M, d.y - 4, 'Preenchido por:')
    d.field(M + 78, d.y - 9, 220, 16, 'Preenchido por')
    c.drawString(M + 320, d.y - 4, 'Data:')
    d.field(M + 350, d.y - 9, W - M - (M + 350), 16, 'Data')
    d.y -= 30

    d.section(1, 'Palestras e minicurso: horário e nome completo', 'Todas aparecem no site como "Horário a definir". Os encontros são das 18h às 21h. Informe o horário dentro dessa janela (ex.: 19h00 – 19h40) e, quando faltar, o nome completo do palestrante.')
    d.table(
        ['Dia', 'Atividade', 'Palestrante', 'Horário', 'Nome completo / ajuste'],
        [40, 170, 78, 70, 113],
        [
            ['19/10', 'Empreendedorismo na Era Digital', 'Cláudio Eduardo Barral', '', None],
            ['19/10', 'Das redes neurais aos LLMs', 'Laís Bordallo', '', None],
            ['19/10', 'Quando a Máquina Aprende a Ouvir: IA na Escuta Psiquiátrica', 'Rafael', '', ''],
            ['20/10', 'Palestra (título em definição)', 'Sandro', '', ''],
            ['20/10', 'Minicurso: GitHub e Versionamento de Código', 'Anderson Souza', '', None],
            ['21/10', 'Robótica Inteligente e ROS', 'Karen', '', ''],
        ],
        field_cols={3, 4},
    )
    d.labeled('Título da palestra do Sandro (20/10)', h=30, multiline=True)

    d.section(2, 'Grade horária proposta (18h às 21h)', 'O edital previa atividades das 8h às 18h. O site agora mostra a mesma sequência adaptada à janela das 18h às 21h. Confirme ou ajuste cada bloco.')
    d.table(
        ['Dia', 'Proposta no site', 'OK? / ajuste'],
        [40, 271, 160],
        [
            ['19/10', '18h00 credenciamento e abertura · 18h30 desafios e regras · 19h00 formação das equipes e kits · 19h20 início do desenvolvimento com mentores (até 21h)', ''],
            ['20/10', '18h00 desenvolvimento com mentores, palestra e minicurso em paralelo · 20h20 checkpoint obrigatório (até 21h)', ''],
            ['21/10', '18h00 sprint final e pitch · 18h40 entrega (congelamento) e apresentações à banca · 20h15 deliberação e voto do público · 20h30 encerramento e premiação', ''],
        ],
        field_cols={2},
        row_h=30,
    )
    d.labeled('O edital previa 210 min de apresentações (~15 min por equipe). Na janela da noite cabem ~95 min (~6 equipes por banca). Haverá bancas paralelas ou tempo menor por equipe?', h=40, multiline=True, label_w=200)

    d.section(3, 'Banca avaliadora (21/10, à noite)', 'O edital pede no mínimo 3 avaliadores (docentes e/ou convidados externos).')
    for i in range(1, 6):
        d.labeled(f'Avaliador(a) {i}' + (' (opcional)' if i > 3 else ''))

    d.section(4, 'Premiação', 'O site mostra as categorias e os prêmios especiais do edital, mas o prêmio de cada colocação está como "a definir".')
    d.table(
        ['Colocação', 'Categoria Software (desafios 1, 2, 9, 10, 11)', 'Categoria IoT (desafios 3 a 8)'],
        [70, 201, 200],
        [['1º lugar', '', ''], ['2º lugar', '', ''], ['3º lugar', '', '']],
        field_cols={1, 2},
    )
    d.labeled('Prêmios especiais (Melhor Solução Técnica, Mais Inovadora, Melhor UX, Destaque Multidisciplinar, Prêmio do Público)', h=34, multiline=True)

    d.section(5, 'Inscrições', 'Datas em branco no edital (itens 5.1, 5.3 e 11). O formulário de inscrição já está pronto e ligado ao site.')
    d.labeled('Início das inscrições')
    d.labeled('Encerramento das inscrições')
    d.labeled('Divulgação da alocação dos desafios')

    d.section(6, 'Local')
    d.labeled('Endereço completo do campus', h=30, multiline=True)
    d.labeled('Sala / auditório / laboratórios', h=30, multiline=True)

    d.section(7, 'Perguntas frequentes e certificado')
    d.labeled('Os participantes precisam levar notebook?', h=30, multiline=True)
    d.labeled('Carga horária do certificado (item 14)')

    d.section(8, 'Minicursos de apoio (item 13 do edital)', 'O edital prevê os minicursos abaixo "a confirmar". Marque os confirmados e informe dia, horário e ministrante para entrarem na programação.')
    d.table(
        ['Minicurso', 'Dia e horário', 'Ministrante'],
        [205, 120, 146],
        [
            ['Do zero ao MVP com Django', '', ''],
            ['Mapas e roteamento com OpenStreetMap', '', ''],
            ['Criptografia na prática: da Enigma ao AES', '', ''],
            ['IoT com ESP32 e MQTT', '', ''],
            ['Instrumentação de baixo custo e calibração de sensores', '', ''],
            ['Desenvolvimento de jogos com Godot ou Phaser', '', ''],
            ['Acessibilidade digital na prática', '', ''],
            ['Pitch técnico (oficina, proposta para 21/10 às 18h)', '', ''],
        ],
        field_cols={1, 2},
        row_h=22,
    )

    d.section(9, 'Confirmações rápidas')
    d.labeled('Nome oficial do evento: o edital usa "Hackathon ESW & ADS 2026" e o site usa "Hackathon Univassouras". Qual usar?', h=34, multiline=True, label_w=200)
    d.labeled('Podemos publicar o PDF do edital no site (botão "Baixar edital")?', h=24, label_w=200)
    d.labeled('Outras observações', h=60, multiline=True, label_w=200)

    d.save()


if __name__ == '__main__':
    out = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'docs', 'Informacoes_Pendentes_Site_Hackathon.pdf'))
    build(out)
    print('ok')

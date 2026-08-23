#!/usr/bin/env python3
"""Gera o ícone do site a partir do logo da marca.

    python3 scripts/gerar-icones.py

Entrada:  public/marca/logo-colorida.png  (447x447, fundo transparente)
Saída:    app/favicon.ico    16+32+48, transparente — a aba e o /favicon.ico
          app/icon.png       512, transparente — telas de alta densidade
          app/apple-icon.png 180, sobre plum-deep — tela de início do iPhone

POR QUE O RECORTE. O arquivo da marca tem margem morta: o desenho ocupa
326x361 dentro de 447x447 e ainda por cima está fora do centro. Num favicon de
16px essa margem é ~15% do lado, e o que sobra para o desenho é pequeno demais
para se reconhecer. Aqui o alfa é medido, o desenho é recortado e recentrado
num quadrado com folga própria — o mesmo desenho, ocupando o que ele tem.

⚠️ O apple-icon NÃO É TRANSPARENTE, e não é descuido. O iOS não respeita alfa
na tela de início: um PNG transparente é achatado sobre PRETO, e o roxo escuro
da marca sumiria dentro dele. Então o fundo é o `plum-deep` do site (#180929),
que é a mesma cor que o site já usa atrás do logo nos heróis escuros.
"""

from PIL import Image

ORIGEM = "public/marca/logo-colorida.png"
PLUM_DEEP = (24, 9, 41, 255)


def marca():
    """O desenho sozinho, sem a margem morta do arquivo."""
    im = Image.open(ORIGEM).convert("RGBA")
    return im.crop(im.getchannel("A").getbbox())


def quadrado(desenho, lado, folga, fundo=(0, 0, 0, 0)):
    """O desenho centrado num quadrado de `lado`, ocupando `1 - folga` dele."""
    util = round(lado * (1 - folga))
    escala = util / max(desenho.size)
    w, h = (max(1, round(d * escala)) for d in desenho.size)
    peca = desenho.resize((w, h), Image.LANCZOS)
    tela = Image.new("RGBA", (lado, lado), fundo)
    tela.paste(peca, ((lado - w) // 2, (lado - h) // 2), peca)
    return tela


def main():
    desenho = marca()

    # 8% de folga: sem nenhuma, o desenho encosta na borda da aba; com muita,
    # ele encolhe e o favicon vira um borrão colorido.
    quadrado(desenho, 512, 0.08).save(
        "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    quadrado(desenho, 512, 0.08).save("app/icon.png")

    # A tela de início recorta o ícone em quina arredondada, então aqui a folga
    # é maior — o desenho não pode encostar no corte.
    quadrado(desenho, 180, 0.30, PLUM_DEEP).convert("RGB").save("app/apple-icon.png")

    print("app/favicon.ico, app/icon.png e app/apple-icon.png regerados")


if __name__ == "__main__":
    main()

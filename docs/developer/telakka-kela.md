# Kela Telakka

Tämä dokumentti rajaa ensimmäisen Kela-kierroksen. Tavoite ei ole tehdä sivukohtaisia selainmoottorihackeja, vaan löytää ensimmäinen konkreettinen Servo-puute ja korjata se yleisesti.

## MVP-rajaus

Kela MVP on valmis, kun nämä toimivat Katselimessa:

1. `https://www.kela.fi/` latautuu.
2. Etusivun keskeinen sisältö on luettavissa.
3. Päänavigaation linkki avautuu samassa satamassa.
4. Kelan hakuun pääsee tai hakulomake antaa ymmärrettävän virheen.
5. `https://asiointi.kela.fi/` avautuu tunnistautumisen alkuun asti.

## Whitelist-lähtötila

Whitelist sisältää `kela.fi`-merkinnän. Logiikka sallii alidomainit, joten ainakin nämä ovat satamassa:

- `www.kela.fi`
- `asiointi.kela.fi`

Lookalike-domainit eivät saa mennä läpi:

- `kela.fi.example.com`
- `example-kela.fi`
- `kelafi.example`

Tuotannon whitelist-data hallinnoidaan yksityisessä repossa. Julkinen selainkoodi lukee sen CDN:stä tai paikallisesta kehityspolusta.

## Ensimmäinen testikierros

Kirjaa jokainen hajoamiskohta näin:

- **URL:** tarkka osoite
- **Toisto:** lyhyt askel, jolla virhe näkyy
- **Odotettu:** mitä selaimen pitäisi tehdä
- **Toteutunut:** mitä Servo/Katselin teki
- **Konsoli/loki:** olennainen virheviesti
- **Epäilty puute:** layout, fetch, evästeet, lomakkeet, dialogit tai PDF
- **Patch-status:** `upstreamable`, `local-only`, `submitted` tai `remove-when-upstreamed`

## Seuraava tekninen askel

Kun ensimmäinen rikkomus on toistettu, korjaus tehdään pienimpänä yleisenä muutoksena. Älä lisää ehtoja muodossa `if url contains kela.fi`; Kela toimii testikohteena, ei poikkeuksena.

Katso myös [filosofia.md](../philosophy/filosofia.md).

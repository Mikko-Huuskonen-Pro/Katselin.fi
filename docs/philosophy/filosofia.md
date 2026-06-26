# Katselin-filosofia

*Versio 0.2 — kesäkuu 2026*

## Perusajatus

Katselin ei ole vain käyttöliittymä selaimen päällä. Katselin on turvallinen arkiympäristö, jossa tärkeät digipalvelut tehdään ymmärrettäviksi, rajatuiksi ja luotettaviksi.

Tavoite ei ole tehdä koko internetistä helppoa. Tavoite on tehdä tärkeistä asioista turvallisia.

## Ei Google-riippuvuuksia

Katselimen lähtökohta on, ettei ratkaisun ytimeen rakenneta Google-riippuvuutta.

Jos jokin tärkeä sivu ei toimi Servolla, ratkaisu ei ole piilottaa taustalle Chromiumia tai Chromea. Ratkaisu on selvittää, mitä Servosta puuttuu, ja korjata puuttuva osa mahdollisimman yleisesti ja standardien mukaisesti.

Periaate:

> Kela ei toimi → selvitetään puuttuva web-alustan osa → korjataan Servo/Katselin-yhteensopivuus.

Ei:

> Kela ei toimi → käytetään Chromea.

## Servo on moottori, Katselin on satama

Servo on Katselimen selainmoottori. Katselin ei yritä muuttaa Servoa omaksi tuotteekseen eikä forkata sitä pysyvästi erilleen upstreamista.

Roolit:

- **Servo** on selainmoottori.
- **Katselin** on turvallinen käyttöympäristö.
- **Varustamo** on luotettujen sovellusten jakelupaikka.
- **Viranomaisväylä** (ei toteuteta) on tärkeiden viranomaispalvelujen käyttäjälle näkyvä sovellus. Perus whitelistaus ajaa sen yli.
- **Telakka** on kehitysmalli, jolla korjataan Servosta puuttuvia osia.

## Whitelist ensin

Katselimessa ei tarvitse aloittaa koko avoimesta webistä. Aluksi määritellään tärkeimmät palvelut, joiden täytyy toimia.

Ensimmäinen whitelist voi sisältää esimerkiksi:

- Kela
- Suomi.fi
- OmaKanta
- Vero
- eläke- ja viranomaispalvelut
- pankkitunnistuksen kannalta välttämättömät sivut

Whitelist ei ole kiertotie Servon ohi. Se on testilista sille, mitä Katselimen pitää osata.

## Kela on ensisijainen testi

Ikäihmiselle Kela ei ole sivuasia. Se voi olla yksi tärkeimmistä digipalveluista.

Siksi Kela.fi ja Kelan asiointi ovat Katselimelle erityisen tärkeitä testikohteita. Jos Kela ei toimi, Katselin ei ole vielä valmis niille käyttäjille, joita varten sitä rakennetaan.

Ensimmäiset testit:

1. Kela.fi etusivu latautuu.
2. Navigaatio ja haku toimivat.
3. Asiointi.kela.fi pääsee tunnistautumisen alkuun.
4. Tunnistautumisvirta toimii.
5. Lomakkeet, viestit ja PDF:t toimivat.

### Whitelist ei tee sivusta toimivaa

Whitelist ratkaisee turvallisuuden ja fokuksen: käyttäjä pysyy satamassa ja tärkeät palvelut ovat tarkoituksella saatavilla. Se ei korvaa selainmoottorin yhteensopivuutta.

`kela.fi` whitelistissa tarkoittaa, että navigointi sinne on sallittu — ei sitä, että sivu latautuu, JavaScript toimii tai asiointi onnistuu. Suurin osa Kelan työstä tapahtuu **Servossa** (Telakka), ei Katselimen UI- tai hakukerroksessa.

### Testitasojen realistisuus

| Testi | Tavoite | Realistisuus |
|---|---|---|
| 1. Etusivu latautuu | `www.kela.fi` avautuu ja sisältö on luettavissa | Kohtuullinen |
| 2. Navigaatio ja haku | Linkit, valikot ja haku toimivat riittävän luotettavasti | Mahdollinen |
| 3. Asiointi.kela.fi → tunnistautumisen alku | Eri subdomain, istunto, lomakkeet | Vaikea |
| 4. Koko tunnistautumisvirta | FTN-ketju pankkien ja välittäjien kautta | Erittäin vaikea |
| 5. Lomakkeet, viestit, PDF:t | Kirjautunut asiointi arjessa | Erittäin vaikea |

### Tunnistautumisketju (FTN)

Kela-asiointi käyttää vahvaa tunnistautumista (FTN). Virta kulkee useiden välittäjien kautta.

Suljettu satama ja avoin tunnistautumisketju vaativat eksplisiittisen mallin:

1. **Laajennettu whitelist** — FTN-ketjun domainit whitelistataan tarkoituksella.
2. **Tilapäinen tunnistuspolku** — auth-vaiheessa rajattu poikkeus satamasta.
3. **Erillinen Viranomaisväylä-sovellus** — ei toteutettu; whitelist korvaa osittain.

## Ei sivukohtaisia selainmoottorihackeja

Katselin ei lisää Servo-koodiin sivukohtaisia poikkeuksia kuten `if url contains kela.fi`.

Hyvä korjaus on pieni, testattava, standardin mukainen ja upstreamattavissa Servoon.

## Upstreamia ei rikota

Katselimen omat osat pidetään erillään Servon koodista.

Patchit merkitään statuksella: `upstreamable`, `submitted`, `local-only`, `remove-when-upstreamed`.

## Telakka

Työnkulku:

1. Valitaan tärkeä sivu, joka ei toimi.
2. Toistetaan ongelma Servossa.
3. Kirjataan ensimmäinen konkreettinen hajoamiskohta.
4. Selvitetään puuttuva API, standardiominaisuus tai bugi.
5. Tehdään pienin mahdollinen korjaus.
6. Lisätään testi.
7. Ajetaan Katselin-testit.
8. Tarjotaan korjaus upstreamiin.
9. Poistetaan paikallinen patch, kun upstream sisältää korjauksen.

Katso käytännön Kela-esimerkki: [telakka-kela.md](../developer/telakka-kela.md).

## Katselin Ready

Selain on Katselin Ready vasta, kun tärkeimmät arjen palvelut toimivat luotettavasti satamassa.

| Taso | Kriteeri | Merkitys käyttäjälle |
|---|---|---|
| **Kela MVP** | `www.kela.fi` latautuu, navigaatio ja haku toimivat | Löytää tiedon turvallisesti |
| **Kela asiointiin** | `asiointi.kela.fi` avautuu, tunnistautumisen alkuun pääsee | Ymmärtää miten asiointi alkaa |
| **Kela kirjautunut** | FTN onnistuu, viestit ja lomakkeet toimivat | Voi hoitaa asiansa |
| **Kela Ready** | PDF:t, liitteet ja pitkät istunnot luotettavasti | Arjen digipalvelu valmis |

## Ydinlause

> Servo on moottori. Katselin on satama. Telakka korjaa moottoria, mutta ei muuta sitä satamaksi.

Kaikkea nettiä ei tarvitse tehdä helpoksi. Tärkeät asiat pitää tehdä turvallisiksi.

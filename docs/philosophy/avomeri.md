# Avomeri-konsepti

Katselin-projekti · Versio 1.0 – kesäkuu 2026

## Visio

> Satamassa asutaan. Avomerellä käydään.

Katselimen ensisijainen tehtävä on tarjota turvallinen, ennustettava ja luotettava tapa käyttää verkkoa. Kaikkea internetiä ei tarvitse tuoda satamaan.

Kun käyttäjä haluaa poistua kuratoidusta ympäristöstä tutkimaan muuta verkkoa, hän voi lähteä Avomerelle. Avomeri ei ole toinen selain — se on Katselimen erityinen selaustila.

## Satama

Luotettu ympäristö. Ominaisuudet:

- Kuratoidut sivustot
- Varustamon sovellukset
- Pysyvät kirjautumiset
- Evästeet sallittu
- Käyttäjäprofiili säilyy
- Meilisearch-pohjainen haku

Satama on Katselimen oletustila.

## Avomeri

Tutkimusmatka avoimeen internetiin. Ominaisuudet:

- Ei pysyvää profiilia
- Ei historiaa
- Ei tallennettuja evästeitä
- Ei pysyvää localStoragea tai IndexedDB:tä
- Ei automaattisia kirjautumisia
- Oikeudet estetty oletuksena

Kun Avomeri suljetaan, kaikki Avomeren data poistetaan.

## Laituri

Laituri on käyttäjän oma alue Sataman ja Avomeren välissä — sivustoille, joita käyttäjä käyttää säännöllisesti, mutta joita ei ole vielä hyväksytty osaksi Satamaa.

- Satama = yhteisön luottamus
- Laituri = käyttäjän luottamus

Polku: Avomeri → Laituri → Satama. Kaikkien sivustojen ei tarvitse koskaan päästä Satamaan.

## Eri tilassa eri säännöt

Sivustojen hallinta tapahtuu Sataman ja Avomeren tasolla. Satamassa haku käyttää paikallista Meilisearch-indeksiä. Avomeren hakuja ei sekoiteta Sataman whitelistiin.

```text
Katselin
├─ Satama
└─ Avomeri
```

## Käyttäjäprofiilit

| Profiili | Avomeri |
|---|---|
| Junior | Pois käytöstä — näkee vain Sataman |
| Senior | Pois käytöstä oletuksena, voidaan ottaa käyttöön |
| Normaali | Käytössä — voi siirtyä milloin tahansa |

## Hakukone Avomerellä

Oletus: **Qwant** (eurooppalainen, yksityisyyttä kunnioittava). Vaihtoehdot: Startpage, DuckDuckGo.

## Filosofia

Katselin ei pyri estämään internetiä. Katselin pyrkii tekemään internetin käytöstä ymmärrettävää.

Satama on koti. Laituri on oma vene. Avomeri on maailma kotisataman ulkopuolella.

Käyttäjä tietää aina kummassa maailmassa hän on.

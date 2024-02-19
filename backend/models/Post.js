//Tämän avulla voidaan käyttää poolia (Navigoidaan)
const db = require("../config/db");

class Post {
  constructor(Kayttajatunnus, Salasana, Pisteet) {
    this.Kayttajatunnus = Kayttajatunnus;
    this.Salasana = Salasana;
    this.Pisteet = Pisteet;
  }

  //Tehdään tallennusmetodi, jotta voimme tallentaa postmanista tehdyt asiat tietokantaamme
  async tallennus() {
    //SQL tietokantaan lisäys
    let sql = `
        INSERT INTO posts(
            Kayttajatunnus, Salasana, Pisteet
        )
        VALUES(
            '${this.Kayttajatunnus}',
            'AES_ENCRYPT('${this.body}','key')',
            '${this.Pisteet}'
        )
        `;
    //await voidaan käyttää .promisen takia mikä tehtiin db.js
    //Suoritetaan sql kysely
    const [newPost, _] = await db.execute(sql);

    //Palauttaa uuden postauksen mikä juuri tehty
    return newPost;
  }

  static haeKaikkiPelaajat() {
    let sql = "SELECT * FROM pelaaja ORDER BY Pisteet DESC;";
    return db.execute(sql);
  }
}

//Exportataan, jotta voimme käyttää class "Post" postcontrollers.js luokassa
module.exports = Post;

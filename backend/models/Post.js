//Tämän avulla voidaan käyttää poolia (Navigoidaan)
const db = require("../config/db");

class uusiKayttaja {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  //Tehdään tallennusmetodi, jotta voimme tallentaa postmanista tehdyt asiat tietokantaamme
  async tallennus() {

    //SQL tietokantaan lisäys
    let sql = `
        INSERT INTO posts(
            title,
            body,
            created_at
        )
        VALUES(
            '${this.title}',
            '${this.body}',
            '${createdAtDate}'
        )
        `;
    //await voidaan käyttää .promisen takia mikä tehtiin db.js
    //Suoritetaan sql kysely
    const [newPost, _] = await db.execute(sql);

    //Palauttaa uuden postauksen mikä juuri tehty
    return newPost;
  }

  static findAll() {
    let sql = "SELECT * FROM posts;";
    return db.execute(sql);
  }

}

//Exportataan, jotta voimme käyttää class "Post" postcontrollers.js luokassa
module.exports = Post;
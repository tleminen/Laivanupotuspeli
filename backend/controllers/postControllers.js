//importataan jotta voimme käyttää Post luokkaa
const uusiKayttaja = require("../models/Post");

//GET kaikki pelaajat
exports.getAllPosts = async (req, res, next) => {
  try {
    //Käytetään [] ja _ jotta postmanissa kun tehdään get niin tuodaan vain halutut asiat näkyviin eikä kaikkea
    // kenttätietoja yms yms
    const [posts, _] = await uusiKayttaja.haeKaikkiPelaajat();

    res.status(200).json({ posts });
  } catch (error) {
    //Printataan error näkyviin
    console.log(error);
    //Viedään error julkiseen virheiden käsittelijään
    next(error);
  }
};
//POST rekisteröinti
exports.createNewPost = async (req, res, next) => {
  try {
    //Haetaan postmanista tehty postaus
    let { Kayttajatunnus, Salasana, Pisteet } = req.body;
    //Tämä onnistuu sen takia, koska teimme Post luokkaan constructorin
    let rekisteroityminen = new uusiKayttaja(Kayttajatunnus, Salasana, Pisteet);

    await rekisteroityminen.tallennus();

    //Palautetaan viesti, että postaus tehty
    res.status(201).json({ message: "Postaus tehty" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//PUT pisteen lisäys +1
exports.putPosts = async (req, res, next) => {
  try {
    let ID = req.params.id;
    await uusiKayttaja.updateByID(ID);
    res.status(200).json({ message: "Pisteet päivittynyt" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GET kirjautuminen
exports.kirjautuminen = async (req, res, next) => {
  try {
    let postitus = req.body;
    let { Kayttajatunnus, Salasana } = req.body;
    const [kayttaja, _] = await uusiKayttaja.kirjautuminen(
      Kayttajatunnus,
      Salasana
    );
    
   /*
    let jsonobj = Object.keys(postitus)[0];
    let obj = JSON.parse(jsonobj);
    let kt = obj.Kayttajatunnus;
    let ss = obj.Salasana;
    const [kayttaja, _] = await uusiKayttaja.kirjautuminen(kt, ss);

    */

    res.status(200).json({ kayttaja });
  } catch (error) {
    console.log(error);
    //Viedään error julkiseen virheiden käsittelijään
    next(error);
  }
};

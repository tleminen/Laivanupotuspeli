//importataan jotta voimme käyttää Post luokkaa
const uusiKayttaja = require('../models/Post');

//GET kaikki
exports.getAllPosts = async (req, res, next) => {
    try {
        //Käytetään [] ja _ jotta postmanissa kun tehdään get niin tuodaan vain halutut asiat näkyviin eikä kaikkea
        // kenttätietoja yms yms
        const [posts, _] = await uusiKayttaja.findAll();

        res.status(200).json({posts});
    } catch (error) {
        //Printataan error näkyviin
        console.log(error);
        //Viedään error julkiseen virheiden käsittelijään
        next(error);
    }
};
//POST
exports.createNewPost = async (req, res, next) => {
    try {
        //Haetaan postmanista tehty postaus
        let {Kayttajatunnus, Salasana, Pisteet} = req.body;
        //Tämä onnistuu sen takia, koska teimme Post luokkaan constructorin
        let rekisteroityminen = new uusiKayttaja(Kayttajatunnus, Salasana, Pisteet);

        await rekisteroityminen.tallennus();

        //Palautetaan viesti, että postaus tehty
        res.status(201).json({ message: "Postaus tehty"});

    } catch (error) {
        console.log(error);
        next(error);
    }
};
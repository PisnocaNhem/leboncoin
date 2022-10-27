import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getAll = (req, res) => {

    dbConnect();


    let query = ''
    let query2 = ''
    let title = ''
    let price = ''
    let zipCode = ''
    let page = ''
    let queryParam = []
    const step = 1


    if  ( req.route.stack[0].method == 'post') {

        console.log('req body :', req.body)

        title = req.body.searchPN ? req.body.searchPN : ''
        price = req.body.pricePN  ? req.body.pricePN : ''
        zipCode = req.body.localisationPN ? req.body.localisationPN : ''
        queryParam = [title, price, zipCode]
    } else {
        
        console.log('eee',req.params)

        page = req.params.page ?req.params.page : 0
        page = page - 1
        page = page < 0 ? 0 : page

        title = req.params.title ? req.params.title : ''
        title = title == 'null' ? '' : title

        price = req.params.price ? req.params.price : ''
        price = price == 'null' ? '' : price

        zipCode = req.params.zipcode ? req.params.zipcode : ''
        zipCode = zipCode == 'null' ? '' : zipCode

        queryParam = [page+1, title, price, zipCode]

    }

    if (title != '' && price != '' && zipCode != '' && page === '') {
        
        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL LIMIT 1`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements`
        


    } else if (page != '') {
        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%' LIMIT 1 OFFSET ${page*step}`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements  WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%'`

    } else {

        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%' LIMIT 1`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements  WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%'`
    
    }

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query(query2, (err, rowsCount, fields) => {
                if (!err) {
                    console.log('e',req.session)
                    res.render("index", {rows: rows, rowsCount: rowsCount, queryParam: queryParam, session: req.session ?? null});
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err);
        }
    });



}

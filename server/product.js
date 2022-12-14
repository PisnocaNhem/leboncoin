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
    const step = 5


    if  ( req.route.stack[0].method == 'post') {

        // console.log('req body :', req.body)

        title = req.body.searchPN ? req.body.searchPN : ''
        price = req.body.pricePN  ? req.body.pricePN : ''
        zipCode = req.body.localisationPN ? req.body.localisationPN : ''
        queryParam = [title, price, zipCode]
    } else {
        
        // console.log('eee',req.params)

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
        
        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL LIMIT 5`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements`
        


    } else if (page != '') {
        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%' LIMIT 5 OFFSET ${page*step}`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements  WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%'`

    } else {

        query = `SELECT id_announcement, type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%' LIMIT 5`;
        query2 = `SELECT COUNT(*) AS rowCount FROM announcements  WHERE announcements.archivated_at IS NULL AND announcements.title LIKE '%${title}%' AND announcements.price LIKE '%${price}%' AND announcements.zipcode LIKE '%${zipCode}%'`
    
    }

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query(query2, (err, rowsCount, fields) => {
                if (!err) {
                    // console.log('e',req.session)
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

export const getDetail = (req, res) => {
    console.log(req.body);



    dbConnect();
        const query = `SELECT announcements.id_announcement, announcements.id_cat, announcements.type, announcements.title, announcements.description, announcements.photo, announcements.price, announcements.zipcode, announcements.created_at AS created_at_announcement, announcements.id_user, 
                    users.id, users.name, users.created_at AS created_at_user
        FROM announcements LEFT JOIN users ON announcements.id_user = users.id WHERE id_announcement = '${req.params.id}';`;
        mysqlConnection.query(query, (err, rows) => {
            if (req.params.modif === "true") {
                if (!err) {
                    res.render("modifyProduct", {announcements: rows[0], session: req.session ?? null});
                } else {
                    console.log(err);
                }
            } else {
                if (!err) {
                    res.render("templates/detail", {announcements: rows[0], session: req.session ?? null});
                } else {
                    console.log(err);
                }
            }
           
        });

}

export const updateProduct = (req, res) => {
    console.log('eee',req.body);
    console.log('params', req.params)
    dbConnect();
    
        const query = `UPDATE announcements SET type = '${req.body.type}', title = '${req.body.title}', description = '${req.body.description}', photo = '${req.file.filename}', price = '${req.body.price}', zipcode = '${req.body.zipcode}', id_cat = '${req.body.id_cat}' WHERE announcements.id_announcement = ${req.params.id};`;
        mysqlConnection.query(query, (err, rows) => {
            if (!err) {
                console.log('query', query)
                res.redirect("/");

            } else {
                console.log(err);
            }
        });

}

export const getFromCategory = (req, res) => {
    

    const query = `SELECT * FROM announcements WHERE id_cat = ${req.params.id}`
    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.render("index", {rows: rows, id_cat: req.params.id, session: req.session ?? null})
        } else {
            console.log(err)
        }
    })
}

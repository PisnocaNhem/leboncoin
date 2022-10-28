import { check, validationResult }  from 'express-validator';


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
            res.render('addProduct', { title: 'Ajouter un produit', messages: errors.array(), session: req.session ?? null });
    }
    else {
        next();
    }
}

const checkForm = [  
check('type', 'Veuillez selectionner le type d\'offre').notEmpty(),
check('title', 'Ce champ est obligatoire').notEmpty().isLength({ min:3 , max: 50 }),
check('description', 'Veuillez ajouter une description').notEmpty().isLength({ min:50 , max: 500 }),
check('price', 'Veuillez renseigner un prix').notEmpty().isInt().isLength({ min:1 , max: 5 }),
check('zipcode', 'Veuillez renseigner un code postal').notEmpty().isNumeric().isLength({ min:3 , max: 5 }),
check('id_cat', 'Veuillez Séléctionner une Catégorie').notEmpty().isInt().isLength({ min:1 , max: 1 }),
];

export {validate, checkForm};
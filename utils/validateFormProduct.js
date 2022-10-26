import { check, validationResult }  from 'express-validator';


const validate = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        next();
    }
}

const checkForm = [  check('type', 'Veuillez selectionner le type d\'offre').notEmpty(),
check('title', 'Ce champ est obligatoire').notEmpty().isLength({ min:3 , max: 50 }),
check('description', 'Veuillez ajouter une description').notEmpty().isLength({ min:50 , max: 500 }),
check('photo', 'Veuillez ajouter une photo').notEmpty(),
check('price', 'Veuillez renseigner un prix').notEmpty().isNumeric().isLength({ min:1 , max: 5 }),
// check('zipcode', 'Veuillez renseigner un code postal').notEmpty().isNumeric().isLength({ min:3 , max: 5 }),
// check('status', 'Veuillez selectionner le statut de l\'annonce').notEmpty(),
];


export {validate, checkForm};
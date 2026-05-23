import multer from "multer";


// storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        let newfilename =
            new Date().toISOString() + file.originalname;

        cb(null, file.originalname);

    }

});


// file filter
const fileFilter = (req, file, cb) => {

    if (

        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"

    ) {

        cb(null, true);

    }
    else {

        cb(null, false);

    }

};


// upload middleware
const upload = multer({

    storage: storage,
    fileFilter: fileFilter

});


export default upload;
import multer from 'multer';

const storage = multer.diskStorage({
    /*destination: (req, file, cb) => cb(null, './public'),*/
    destination: function(req,file,cb){
        let folder;
        if (file.fieldname === 'profileImage') {
            folder = 'profiles'
        } else if(file.fieldname === 'productImage') {
            folder = 'products' }
            else {
                folder = 'documents'
            }
            cd(null, `uploads/${folder}`)
        },
    //filename: (req, file, cb) => cb(null, file.originalname),
    filename:function(req, file, cb){
        const {uid} = req.params
        cb(null, uid + '-' + `${Date.now()} + '-' + ${file.originalname}`)
    }
});

export const uploader = multer({ storage });
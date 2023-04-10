const express = require('express')
const router = express.Router();
const con = require('./config/db')
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var image = `\\\\192.168.1.123\\ngdata\\kazyplayimages\\profile_img`;
        if (!fs.existsSync(image)) {
            fs.mkdirSync(image, { recursive: true });
            cb(null, image);
        } else {
            cb(null, image);
        }
    },

    filename: function (req, file, cb) {

        // cb(null, file.originalname.split('_').splice(-1)[0])
        cb(null, file.originalname)

    }
})


const upload = multer({ storage: storage, preservePath: true })

router.post('/insertimage', upload.array('image'), (req, res) => {
    res.json("uploaded");
})



router.post('/insertdata', (req, res) => {
    var query = `INSERT INTO akshat (fullname, username, email, phone, password, gender,image) VALUES ('${req.body.name}', '${req.body.Username}','${req.body.email}','${req.body.phonenumber}','${req.body.password}','${req.body.gender}','${req.body.image}');`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            res.json("insert successfully")
        }
    })
})


router.post('/login', (req, res) => {
    var username = req.body.data1.Username;
    var password = req.body.data1.password;
    var query = `select * from akshat where username = '${username}' and password = '${password}';`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            if (result.length > 0) {
                res.json("success");
                // res.json(result);
            } else {
                res.json("loginfailed");
            }

        }
    })
})

router.get('/getalldata', (req, res) => {
    var query = `select * from akshat;`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            res.json(result);
        }
    })
})


router.post('/deleteuser', (req, res) => {
    var id = req.body.id;
    var query = `DELETE FROM akshat where auto_id = '${id}' ;`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            res.json('deleted');
        }
    })
})


router.post('/updateuser', (req, res) => {
    var id = req.body.id;
    var image = req.body.url;
    // console.log(req.body.url)
    var query = `UPDATE akshat SET fullname = '${req.body.newdata.name}', username = '${req.body.newdata.Username}', email = '${req.body.newdata.email}',phone = '${req.body.newdata.phonenumber}', password = '${req.body.newdata.password}', gender = '${req.body.newdata.gender}', image = '${image}' WHERE ( auto_id = '${id}');`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            res.json("update");
        }
    })
})

router.post('/getsingledata', (req, res) => {
    var id = req.body.id;
    var query = `select * from akshat where auto_id = '${id}';`
    con.query(query, (err, result) => {
        if (err) {
            res.json(err)
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;

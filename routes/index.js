var express = require('express');
var router = express.Router();
var Auth = require("../model/auth");
const Product = require('../model/product');

/* GET home page. */
router.get('/', function (req, res, next) {
  //.......Algoritmo
  //res.send("Respuesta del algorimo")
  res.render('index');
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});


router.post("/login", async function (req, res, next) {
  //console.log(req.body);
  if (req.body.user !== "" && req.body.pass !== "") {
    //Validar a la base de datos el usuario y la contraseña
    let authModel = new Auth();
    let login = JSON.parse(await authModel.login(req.body.user, req.body.pass));
    //console.log(login);
    /*/if (req.body.user == "crojas" && req.body.pass == "26394")
      res.json({ status: 1, mssg: "Login Exitoso!" });
    else
      res.json({ status: -1, mssg: "Login Fallido!" });/*/

    if (login.status === 0) {
      req.session.token = login.response.token;
      req.session.user = req.body.user;
      req.session.isAdmin = true;
      res.json({ status: 1, mssg: "Login Exitoso!", secret: login.response.token });
    } else
      res.json({ status: -1, mssg: "Login Fallido!" });
  } else {
    res.json({ status: -1, mssg: "Login Fallido!" });
  }


});

/* GET home page. */
router.get('/resetPassword', function (req, res, next) {
  //.......Algoritmo
  //res.send("Respuesta del algorimo")
  res.render('resetPassword');
});

/* GET home page. */
router.get('/resetPasswordApply/:userId', function (req, res, next) {
  //.......Algoritmo
  //res.send("Respuesta del algorimo")
  res.render("resetPasswordApply");
});

router.get('/admin', function (req, res, next) {
  res.render("admin")
});

router.get('/admin/products', function (req, res, next) {
  res.render("products")
});

router.get('/admin/getProduct/:id', async function (req, res, next) {
  const products = await Product.findById(req.params.id);
  res.json(products);
});

router.get('/admin/getProducts', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// AGREGAR un nuevo producto
router.post('/admin/addProduct', async (req, res) => {
  const { code, name, qty, price, realPrice, marca, type } = req.body;
  const products = new Product({ code, name, qty, price, realPrice, marca, type });
  await products.save();
  res.json({ status: 1, mssg: 'Product Saved' });
});

// ELIMINAR un producto
router.delete('/admin/deleteProduct/:id', async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);
  res.json({status: 1, mssg: 'Product Deleted'});
  /* if (Product.findByIdAndRemove(req.params.id) == true)
    res.json({status: 1, mssg: 'Product Deleted'});
  else (Product.findByIdAndRemove(req.params.id) == false)
    res.json({status: -1, mssg: 'Product Not Deleted'}); */
});

router.get("/admin/clients", function (req, res, next) {
  res.render("admin")
});

router.get("/admin/cashiers", function (req, res, next) {
  res.render("admin")
});





module.exports = router;

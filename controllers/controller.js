const Menu = require('../models/menu');
const Pedido = require('../models/pedido');



module.exports = controller={
    nuevoPedido: (req, res, next) => {
        console.log("caso Nuevo Pedido");
        console.log(req.body);
        Pedido.findOne({ mesa: req.body.mesa })
            .then(data => { //si la consulta se ejecuta
                if (data) { //si el Pedido existe
                    console.error("Mesa already exists");
                    return {"error": "Ya esa mesa tiene un pedido activo"}
                }
                else { //si no existe el contrato se crea/registra
                    console.log("creando pedido");             
                    let orden = new Pedido({mesa: req.body.mesa, pedido: req.body.pedido});
                    return orden.save();
                }
            })
            .then(pedido => { //contrato registrado con exito, pasamos al siguiente manejador                
                res.json(pedido);
            })
            .catch(err => { //error en registro, lo pasamos al manejador de errores
               console.log(err);
               next();
            })
    },
    obtenerPedidos:(req, res, next) => {
        console.log("Obtener Pedidos Activos");
        Pedido.find({})
            .then(data => { //si la consulta se ejecuta
                if (data.length>0) { //si el Pedidos existe
                    res.json(data);
                }
                else { //si no existe el Pedidos se crea/registra
                    console.log("No hay Pedidos");
                    res.json({"error": "No hay Pedidos"});
                }
            })
            .catch(err => { //error en registro, lo pasamos al manejador de errores
               console.log(err);
               next();
            })
    },
    obtenerMenu: (req, res, next) => {
        console.log("Obtener Menu Activo");
        Menu.find({})
            .then(data => { //si la consulta se ejecuta
                if (data.length>0) { //si el Menu existe
                    res.json(data);
                }
                else { //si no existe el Menu se crea/registra
                    console.log("No hay Menu");
                    res.json({"error": "No hay Menu"});
                }
            })
            .catch(err => { //error en registro, lo pasamos al manejador de errores
               console.log(err);
               next();
            })
    },
    nuevoMenu: (req, res, next) => {
        console.log("caso Nuevo Menu");
        console.log(req.body);
        Menu.findOne({ nombre: req.body.nombre })
            .then(data => { //si la consulta se ejecuta
                if (data) { //si el Menu existe
                    console.error("Menu already exists");
                    return {"error": "Ya ese Menu Existe"}
                }
                else { //si no existe el Menu se crea/registra
                    console.log("creando pedido");             
                    let menu = new Menu({tipo: req.body.tipo, nombre: req.body.nombre, precio: req.body.precio });
                    return menu.save();
                }
            })
            .then(menu => { //contrato registrado con exito, pasamos al siguiente manejador                      
                res.json(menu);
            })
            .catch(err => { //error en registro, lo pasamos al manejador de errores
               console.log(err);
               next();
            })
    }
}

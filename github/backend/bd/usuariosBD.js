const Usuario = require("../clases/Usuario");
const {usuariosBD}=require("./conexion");
const {encriptarPassword,validarPassword}=require("../middlewares/funcionesPassword");

function validar(usuario2){
    var validado=false;
    if(usuario2.nombre!=undefined && usuario2.usuario!= undefined && usuario2.password!= undefined){
     validado=true;
    }
        return validado;
}

async function mostrarUsuarios(){
    const usuarios=await usuariosBD.get();
    var usuariosValidos=[];
    usuarios.forEach(usuario => {
        
        const usuario1= new  Usuario({id:usuario.id,...usuario.data()});
        const usuario2 = usuario1.getUsuario;        
        if(validar(usuario2)){
            usuariosValidos.push(usuario2);
        }
    });
    return usuariosValidos;
}

async function buscarPorId(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido={error:true};
    if(validar(usuario1.getUsuario)){
    usuarioValido=usuario1.getUsuario
    }
    return usuarioValido
}

async function nuevoUsuario(data){
    const {salt, hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    var usuarioValido=false;
    if(validar(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario)
        usuarioValido=true;
    }
    return usuarioValido;
}

async function borrarUsuario(id) {
    const usuario = buscarPorId(id);
    var borrado=false;
    if(usuario.error!=true){
        await usuariosBD.doc(id).delete();
        borrado=true;
    }
    return borrado;
}

async function modificarUsuario(id, data) {
    const usuarioExistente = await buscarPorId(id); 
    if (usuarioExistente.error) {
        return { error: "Usuario no encontrado" };
    }

    data.tipoUsuario = data.tipoUsuario || usuarioExistente.tipoUsuario || "usuario";

    if (data.password) {
        const { salt, hash } = encriptarPassword(data.password);
        data.password = hash;
        data.salt = salt;
    }

    const usuarioModificado = new Usuario({ id, ...usuarioExistente, ...data });
    if (validar(usuarioModificado.getUsuario)) {
        await usuariosBD.doc(id).set(usuarioModificado.getUsuario); 
        return { success: true, usuario: usuarioModificado.getUsuario };
    } else {
        return { error: "Datos no válidos" };
    }
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario
};


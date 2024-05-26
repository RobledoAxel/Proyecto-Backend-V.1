import fs from "fs";

export default class ProductsManagers{

    constructor(){
        this.path=`./files/products.json`;
        this.init();
    }
    //chequear y/o crear si no existe
    async init(){
        if(fs.existsSync(this.path)){
            console.log(`ok.`)
        }else{
            try{ 
            console.log(`creando un nuevo`)
            await fs.promises.writeFile(this.path,JSON.stringify([]))

            }catch(error){
                console.log(`el archivo no pudo crearse.error: ${error}`)
                process.exit(1);
            }
        }
    }
    //leer los productos
    async getProduts (){
        try{ 
        const data= fs.promises.readFile(this.path,`utf-8`)
        return JSON.parse(data);
        }catch(error){
            console.log(error);
            process.exit(1);
        }
    }

    //carga de datos
    createProduct= async ({title,description,code,price,stock,status=true})=>{ 
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            status
        }
        const products= await this.getProduts()
        
    //manipulacion de objetos con su id
    if(products.length == 0){
        newProduct.id=1;
    }else{
        newProduct.id= products[products.length -1].id +1;
    }
    products.push(newProduct);

    //vuelvo a ingresar todos los datos
    await fs.promises.writeFile(this.path,JSON.stringify(products,null,`\t`))

    return newProduct.id;
} 
}
let title=document.getElementsByClassName("title");
let img=document.getElementsByClassName("img");
let price=document.getElementsByClassName("price")
let btnAddProduct=document.getElementsByClassName("btn-add-click");
let btnCar=document.getElementById("car");
let showTable=document.getElementById("show_table");
let showTableDetailBuys= document.getElementById("show_total");
let countCar=document.getElementById("products_count");
let collectionProduct=[];

for(let i=0; i<btnAddProduct.length;i++){
    btnAddProduct[i].onclick=function(){
        let objProduct={
            title: title[i].textContent,
            img: img[i].src,
            price: Number(price[i].textContent),
            count: 1
        }
        collectionProduct.push(objProduct);
        countCar.textContent=collectionProduct.length;
    }
}

btnCar.onclick=function(){
     tableProducts()
}

function tableProducts(){
    if(collectionProduct.length>0){
     
      let htmlHeadTable=`<table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>`;
      let htmlFootTable = `</tbody>
                        </table>`;

      let htmlBodyTable="";
      
      let table;
    for(let i=0;i<collectionProduct.length;i++){
        htmlBodyTable+=`<tr><td>${i + 1}</td>
                        <td class="img-container"><img src="${collectionProduct[i].img}" class="img-table"></td>
                        <td>${collectionProduct[i].title}</td>
                        <td>L ${collectionProduct[i].price}</td>
                        <td>${collectionProduct[i].count}</td>
                        <td><button type="button" class="btn btn-primary btn-sm" onclick="deleteBuy(${i})">X</button></td>
                        <td></td>
                        </tr>`

    }
    table=htmlHeadTable+htmlBodyTable+htmlFootTable;
    showTable.innerHTML=table;

     detailBuys();
}else{
    validateCarBuys();
 }

}

function detailBuys(){

   let subtotal=0;
   let impuesto=0;
   let total=0;

   for(let i=0;i<collectionProduct.length;i++){
    subtotal+=collectionProduct[i].price*collectionProduct[i].count;
   }

impuesto=subtotal*0.15;
total=subtotal+impuesto;
tableDetailBuys(subtotal,impuesto,total);
}


function tableDetailBuys(subt,imp,total){
    let htmlHeadTable=`<table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Calculos</th>
                  </tr>
                </thead>
                <tbody>`;
                
                let htmlBodyTable=`<tr>
                                    <td>Subtotal</td>
                                    <td>L ${subt}</td>
                                   </tr>
                                   <tr>
                                    <td>impuesto</td>
                                    <td>L ${imp}</td>
                                   </tr>
                                   <tr>
                                    <td>total</td>
                                    <td>L ${total}</td>
                                   </tr>`;
                 let htmlFootTable=`</tbody>
                                  </table>`;

    let table= htmlHeadTable + htmlBodyTable + htmlFootTable;
    showTableDetailBuys.innerHTML=table;              
}

function deleteBuy(i){
    collectionProduct.splice(i,1);
    tableProducts();
    if(collectionProduct.length>0){
    countCar.innerText=collectionProduct.length;
    }else{
        countCar.innerText="";
    }
}

function validateCarBuys(){
    let html=`<div class="alert alert-info" role="alert">
              No hay elementos cargados al carrito.
            </div>`
        showTable.innerHTML="";
        showTableDetailBuys.innerHTML="";
        showTable.innerHTML=html;
}


function validateCountBuys(){
    let obj=collectionProduct.filter(function(Product){
        return Product.title==title;
    });
   return obj;
}


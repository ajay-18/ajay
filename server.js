console.log("it works");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port=process.env.PORT|| 5555;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.listen(port,()=>{console.log(`my server is running at port ${port}`);});

const orders=[];

//get all the orders
app.get("/get_orders",(req,res)=>{res.status(200).send(orders);});

app.post("/new_order",(req,res)=>{
	const order=req.body;
	if(order.product_name && order.customer_name && order.product_qty)
	{
		orders.push({
			...order,
			id: `${orders.length+1}`,
			date: Date.now().toString()
		});
		res.status(200).json({
			message:"order created successfully"
		});
	}
	else{
		res.status()(401).json({
			message:"invalid order creation"
		});
	}
});

app.patch("/order/:id",(req,res)=>{
	const order_id=req.params.id;
	const order_update=req.body;
	for(let order of orders){
		if(order.id==order_id)
		{
			order.product_name=order_update.product_name;
			order.customer_name=order_update.customer_name;
			order.product_qty=order_update.product_qty;
            return res
            .status(200)
            .json({message:"updated successfully",date:order})
		}
	}
	res.status(404).json({message:"invalid order_id"})
})
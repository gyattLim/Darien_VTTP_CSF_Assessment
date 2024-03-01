package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/order",consumes=MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload)
   {

    // TODO Task 3

    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject json = reader.readObject();
    String name = json.getString("name");
    String address = json.getString("address");
    Boolean priority = json.getBoolean("priority");
    String comments = json.getString("comments");
    JsonArray CartJsonArray = json.getJsonArray("cart");
    // System.out.println(Cart);

    Cart cart = new Cart();

    for(JsonObject v: CartJsonArray.getValuesAs(JsonObject.class))
    {
        String prodId = v.getString("prodId");
        Integer quantity = v.getInt("quantity");
        String itemName = v.getString("name");
        float price = v.getInt("price");

        LineItem lineItem = new LineItem();
        lineItem.setProductId(prodId);
        lineItem.setName(itemName);
        lineItem.setQuantity(quantity);
        lineItem.setPrice(price);

        cart.addLineItem(lineItem);

    }

    // System.out.println(cart);

    Order order = new Order();
    order.setName(name);
    order.setAddress(address);
    order.setPriority(priority);
    order.setComments(comments);
    order.setCart(cart);

    String orderId;

    try {
      poSvc.createNewPurchaseOrder(order);
       orderId = order.getOrderId();
    } catch (Exception e) {
      JsonObject ErrorJson = Json.createObjectBuilder().add("Message",e.getMessage()).build();
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorJson.toString());
    }
    

    

    // System.out.println(order.toString());

    JsonObject orderIdJson = Json.createObjectBuilder().add("orderId",orderId).build();



    return ResponseEntity.ok(orderIdJson.toString());
  }
}

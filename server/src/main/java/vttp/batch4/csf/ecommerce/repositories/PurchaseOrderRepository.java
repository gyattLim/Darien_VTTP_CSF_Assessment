package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.Exceptions.ItemException;
import vttp.batch4.csf.ecommerce.Exceptions.OrderException;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;


	public static final String SQL_ORDER = "insert into cart_order(Order_id,orderDate,CustName,address,priority,comments) values(?,?,?,?,?,?)";

	public static final String SQL_ITEM= "insert into cart(Order_id,productId,itemName,quantity,price) values(?,?,?,?,?)";

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) throws OrderException,ItemException{
    // TODO Task 3

      int num = template.update(SQL_ORDER,order.getOrderId(),order.getDate(),order.getName(),order.getAddress(),order.getPriority(),order.getComments());
  
      if(num!=1)
      {
        throw new OrderException("Order Insert Error");
      }
      else{
        
        for(LineItem items:order.getCart().getLineItems())
        {
          
          int numItems = template.update(SQL_ITEM,order.getOrderId(),items.getProductId(),items.getName(),items.getQuantity(),items.getPrice());

          if(numItems!=1)
          {
            throw new ItemException("Item Insert Error");
          }
        }
      }

}
}

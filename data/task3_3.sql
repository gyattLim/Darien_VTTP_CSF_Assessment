-- TODO Task 3
drop database if exists CartOrder;

create database CartOrder;

use CartOrder;

create table Cart_Order (
   Order_id varchar(26) not null,
   orderDate Date not null,
   CustName varchar(128) not null,
   address varchar(128) not null,
   priority boolean not null,
   comments varchar(300),

  

   primary key(Order_id)
);

create table Cart (
    ItemNo int NOT NULL AUTO_INCREMENT,
   Order_id varchar(26) not null,
   productId varchar(128) not null,
   itemName  varchar(128) not null,
   quantity int not null,
   price float not null,

   primary key(ItemNo),
   constraint fk_po_id foreign key(Order_id) references Cart_Order(Order_id)
);

grant all privileges on CartOrder.* to fred@'%';

flush privileges;
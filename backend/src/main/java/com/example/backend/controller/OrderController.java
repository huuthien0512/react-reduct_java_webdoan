package com.example.backend.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Order;
import com.example.backend.model.PaymentResult;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
	
	@Autowired
	public OrderRepository orderRepository;
	@Autowired
	public UserRepository userRepository;
	
	//Lấy danh sách orders
	@GetMapping(value = "/orders")
	public List<Order> getAllOrder(){
		return orderRepository.findAll();
	}
	
	//Tạo order
	@PostMapping(value = "/order/create")
	public ResponseEntity<Order> createOrder(@RequestBody Order order) {
		//System.out.print(order);
		order.getPaymentResult().setUpdateTime(new Date());
		order.getPaymentResult().setUserUpdate("System");
		Order insertedOrder = orderRepository.insert(order);
		return ResponseEntity.status(200).body(insertedOrder);
	}
//	@PutMapping(value = "/order/update")
//	public String updateOrder(@RequestBody Order order) {
//		Order updatedOrder = orderRepository.save(order);
//		return "OK";
//	}
	@GetMapping(value = "/order/{id}")
	public Optional<Order> detail_order(@PathVariable("id") String id) {
		return orderRepository.findById(id);
	}
	
	//Xóa order
	@DeleteMapping(value = "/order/delete/{id}")
	public void deleteOrder(@PathVariable("id") String id) {
		orderRepository.deleteById(id);
		
	}
	
	//update order
		@PutMapping(value = "/order/admin/update/{id}")
		public ResponseEntity<Order> updateProduct(@PathVariable("id") String id, @RequestBody Map<String, Object> payload) {
			if(checkAdmin(payload.get("idCurrent").toString()) == true) {
				List<Order> listOrders = orderRepository.findAll();
				for(int i=0; i<listOrders.size(); i++)
					if (listOrders.get(i).getId().equals(id)) {
						
						listOrders.get(i).getPaymentResult().setStatus(payload.get("status").toString());
						if (payload.get("status").toString().equals("Chưa thanh toán")) {
							listOrders.get(i).setIsPaid(false);
							listOrders.get(i).setPaidAt(null);
							listOrders.get(i).setIsDelivered(false);
							listOrders.get(i).setDeliveredAt(null);
						}
						else if (payload.get("status").toString().equals("Đã thanh toán") || payload.get("status").toString().equals("Đang giao")) {
							listOrders.get(i).setIsPaid(true);
							listOrders.get(i).setPaidAt(new Date());
							listOrders.get(i).setIsDelivered(false);
							listOrders.get(i).setDeliveredAt(null);
						}else if (payload.get("status").toString().equals("Đã giao")) {
							listOrders.get(i).setIsPaid(true);
							listOrders.get(i).setPaidAt(new Date());

							listOrders.get(i).setIsDelivered(true);
							listOrders.get(i).setDeliveredAt(new Date());
						}
						listOrders.get(i).getPaymentResult().setUpdateTime(new Date());
						listOrders.get(i).getPaymentResult().setUserUpdate(payload.get("idCurrent").toString());
						orderRepository.saveAll(listOrders);
						return ResponseEntity.status(200).body(listOrders.get(i));

					}
			}
			return ResponseEntity.status(400).body(null);
		}
		
		//update order
		@PutMapping(value = "/order/status/update/{id}")
		public ResponseEntity<Order> updateStatus(@PathVariable("id") String id) {
						List<Order> listOrders = orderRepository.findAll();
						for(int i=0; i<listOrders.size(); i++)
							if (listOrders.get(i).getId().equals(id)) {
								
								listOrders.get(i).getPaymentResult().setStatus("Đã thanh toán");

								listOrders.get(i).setIsPaid(true);
								listOrders.get(i).setPaidAt(new Date());
								listOrders.get(i).setIsDelivered(false);
								listOrders.get(i).setDeliveredAt(null);

								listOrders.get(i).getPaymentResult().setUpdateTime(new Date());
							
								orderRepository.saveAll(listOrders);
								return ResponseEntity.status(200).body(listOrders.get(i));

							}
						return ResponseEntity.status(400).body(null);
					}
					
	@GetMapping(value = "/order/of/{userId}")
	public ResponseEntity<List<Order>> getMyOrders(@PathVariable("userId") String userId) {
		List<Order> orders = orderRepository.findAll();
		List<Order> myOrders = new ArrayList<Order>();
		for(int i=0; i<orders.size(); i++)
			if(orders.get(i).getUserId().equals(userId)) {
				myOrders.add(orders.get(i));
			}
		return ResponseEntity.status(200).body(myOrders);
	}
	
	//Xóa all order
		@DeleteMapping(value = "/order/delete/all")
		public void deleteOrder() {
			orderRepository.deleteAll();
			
		}
		//check tài khoản admin ?
		public boolean checkAdmin(String id) {
			List<User> users = userRepository.findAll();
			for(int i=0; i<users.size(); i++)
				if (users.get(i).getId().equals(id) && users.get(i).getIsAdmin()==true)
					return true;
			return false;
			}
}

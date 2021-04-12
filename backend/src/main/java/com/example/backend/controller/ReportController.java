package com.example.backend.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Blog;
import com.example.backend.model.Order;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReportController {
	
	@Autowired
	public OrderRepository orderRepository;
	@Autowired
	public UserRepository userRepository;
	@Autowired
	public ProductRepository productRepository;
	@Autowired
	public BlogRepository blogRepository;
	
	//Lấy danh sách report tiền
	@GetMapping(value = "/report/income/month")
	public ResponseEntity<Map<String, Object>> getIncomeMonth(){
		List<Order> listOrders = orderRepository.findAll();
		
		Map<String, Object> payload = new HashMap<>();
		float[] income= {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
		for(int i=0; i<listOrders.size(); i++) {
			if (listOrders.get(i).getIsPaid() == true) {
				LocalDate localDate = listOrders.get(i).getPaidAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
				int month = localDate.getMonthValue();
				int year = localDate.getYear();
				if (year == 2021)
					income[month-1] += listOrders.get(i).getTotalPrice();
			}
		}
		//return ResponseEntity.status(200).body(income);
		float tong = 0;
		for(int i=1; i<=12; i++) {
			tong += income[i-1];
			payload.put("Thang"+i,income[i-1]);
		}
			
		payload.put("Tong",	tong);
		return ResponseEntity.status(200).body(payload);
	}
	
	//Lấy danh sách report user
		@GetMapping(value = "/report/user/month")
		public ResponseEntity<Map<String, Object>> getNumOfUserMonth(){
			List<User> listUsers = userRepository.findAll();
			
			Map<String, Object> payload = new HashMap<>();
			int[] numofuser= {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
			for(int i=0; i<listUsers.size(); i++) {
				LocalDate localDate = listUsers.get(i).getTimeCreate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
				int month = localDate.getMonthValue();
				int year = localDate.getYear();
				if (year == 2021)
					numofuser[month-1] ++;
			}
			//return ResponseEntity.status(200).body(income);
			int tong = 0;
			for(int i=1; i<=12; i++) {
				tong += numofuser[i-1];
				payload.put("Thang"+i,numofuser[i-1]);
			}
			payload.put("Tong",	tong);
			return ResponseEntity.status(200).body(payload);
		}
	
	
		//Lấy danh sách report product
		@GetMapping(value = "/report/product/month")
		public ResponseEntity<Integer> getNumOfProductMonth(){
			List<Product> listProducts = productRepository.findAll();
			return ResponseEntity.status(200).body(listProducts.size());
		}
		
		//Lấy danh sách report blog
				@GetMapping(value = "/report/blog/month")
				public ResponseEntity<Integer> getNumOfBlogMonth(){
					List<Blog> listBlogs = blogRepository.findAll();
					return ResponseEntity.status(200).body(listBlogs.size());
				}
				//Lấy danh sách report order
				@GetMapping(value = "/report/order/month")
				public ResponseEntity<Map<String, Object>> getNumOfOrderMonth(){
					List<Order> listOrders = orderRepository.findAll();
					
					Map<String, Object> payload = new HashMap<>();
					int[] numoforder= {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
					for(int i=0; i<listOrders.size(); i++) {
						LocalDate localDate = listOrders.get(i).getPaymentResult().getUpdateTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
						int month = localDate.getMonthValue();
						int year = localDate.getYear();
						if (year == 2021)
							numoforder[month-1] ++;
					}
					int tong = 0;
					for(int i=1; i<=12; i++) {
						tong += numoforder[i-1];
						payload.put("Thang"+i,numoforder[i-1]);
					}
					payload.put("Tong",	tong);
					return ResponseEntity.status(200).body(payload);
				}

}

package com.example.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	public ProductRepository productRepository;
	
	@GetMapping(value = "/products")
	public List<Product> getAllProduct(){
		return productRepository.findAll();
	}
	
	@PostMapping(value = "/product/create")
	public String createProduct(@RequestBody Product product) {
		Product insertedProduct = productRepository.insert(product);
		return "OK";
	}
	
//	@PutMapping(value = "/product/update/{id}")
//	public String updateProduct(@PathVariable("id") String id, @RequestBody Map<String, Object> payload) {
//		if(checkAdmin(payload.get("idCurrent").toString()) == true) {
//			
//			List<Product> products = productRepository.findAll();
//			for(int i=0; i<products.size(); i++)
//				if (products.get(i).getId().equals(id)) {
//					products.get(i).setName(payload.get("name").toString());
//					//products.get(i).setImage(payload.get("image").toString());
//					products.get(i).setDescription(payload.get("description").toString());
//				//	products.get(i).setBrand(payload.get("brand").toString());
//				//	products.get(i).setCategory(payload.get("category").toString());
//					products.get(i).setPrice(Float.parseFloat(payload.get("price").toString()));
//				//	products.get(i).setCountInStock(Integer.parseInt(payload.get("countInStock").toString()));
//					break;
//				}
//			productRepository.saveAll(products);
//			return "OK";
//		}
//		return "FALSE";
//	}
//	public boolean checkAdmin(String id) {
//	List<User> users = userRepository.findAll();
//	for(int i=0; i<users.size(); i++)
//		if (users.get(i).getId().equals(id) && users.get(i).getIsAdmin()==true)
//			return true;
//	return false;
//}
//
//	@GetMapping(value = "/product/{id}")
//	public Optional<Product> detail_product(@PathVariable("id") String id) {
//		return productRepository.findById(id);
//	}
//	
//	@DeleteMapping(value = "/product/delete/{id}")
//	public void deleteProduct(@PathVariable("id") String id) {
//		productRepository.deleteById(id);
//	}
}

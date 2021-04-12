package com.example.backend.controller;

import java.util.ArrayList;
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

import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
	
	@Autowired
	public ProductRepository productRepository;
	@Autowired
	public UserRepository userRepository;
	
	//Lấy danh sách sản phẩm
	@GetMapping(value = "/products")
	public List<Product> getAllProduct(){
		return productRepository.findAll();
	}
	
	//Tạo sản phẩm
	@PostMapping(value = "/product/create")
	public ResponseEntity<String> createProduct(@RequestBody Product product) {
		System.out.print("9ss");
		Product insertedProduct = productRepository.insert(product);
		return ResponseEntity.status(200).body("Tạo sản phẩm thành công");
	}
	
	//Tìm kiếm sản phẩm
	@PostMapping(value = "/product/search")
	public ResponseEntity<List<Product>> searchProduct(@RequestBody Map<String, Object> payload) {
		List<Product> listProducts = productRepository.findAll();
		List<Product> searchedProducts = new ArrayList<>();
		for(int i=0; i < listProducts.size(); i++) {
			if (listProducts.get(i).getName().contains(payload.get("searchString").toString())) {
				searchedProducts.add(listProducts.get(i));
			}
		}
		return ResponseEntity.status(200).body(searchedProducts);
	}
	
	//Lấy thông tin sản phẩm
	@GetMapping(value = "/product/{id}")
	public ResponseEntity<Optional<Product>> getDetailProduct(@PathVariable("id") String id){
		return ResponseEntity.status(200).body(productRepository.findById(id));
	}
	
	//update product
	@PutMapping(value = "/product/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") String id, @RequestBody Map<String, Object> payload) {
		if(checkAdmin(payload.get("idCurrent").toString()) == true) {
			List<Product> listProducts = productRepository.findAll();
			for(int i=0; i<listProducts.size(); i++)
				if (listProducts.get(i).getId().equals(id)) {
					if(payload.get("name") != null)
						listProducts.get(i).setName(payload.get("name").toString());
					if(payload.get("quantity") != null)
						listProducts.get(i).setQuantity(Integer.parseInt(payload.get("quantity").toString()));
					if(payload.get("price") != null)
						listProducts.get(i).setPrice(Float.parseFloat(payload.get("price").toString()));
					if(payload.get("discount") != null)
						listProducts.get(i).setDiscount(Integer.parseInt(payload.get("discount").toString()));
					if(payload.get("isNew") != null)
						listProducts.get(i).setIsNew(Boolean.parseBoolean(payload.get("isNew").toString()));
					if(payload.get("saleCount") != null)
						listProducts.get(i).setSaleCount(Integer.parseInt(payload.get("saleCount").toString()));
				//	System.out.print(payload.get("category").toString());
					if(payload.get("category") != null )
						listProducts.get(i).setCategory(new String[] {payload.get("category").toString()});
					if(payload.get("image") != null)
						listProducts.get(i).setImage(new String[] {payload.get("image").toString()});
					if(payload.get("description") != null)
						listProducts.get(i).setDescription(payload.get("description").toString());
					productRepository.saveAll(listProducts);
					return ResponseEntity.status(200).body(listProducts.get(i));
				}
		}
		return ResponseEntity.status(400).body(null);
	}

	//Xóa product
	@DeleteMapping(value = "/product/delete/{id}")
	public void deleteProduct(@PathVariable("id") String id) {
		productRepository.deleteById(id);
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

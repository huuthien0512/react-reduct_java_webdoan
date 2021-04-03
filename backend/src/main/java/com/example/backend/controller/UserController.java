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

import com.example.backend.model.Blog;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	public UserRepository userRepository;
	
	@GetMapping(value = "/users")
	public List<User> getAllUser(){
		return userRepository.findAll();
	}
	
	@PostMapping(value = "/user/login")
	public User login(@RequestBody User user){
		List <User> listUsers = userRepository.findAll();
		for(int i=0; i<listUsers.size(); i++)
			if(listUsers.get(i).getUsername().equals(user.getUsername()) && listUsers.get(i).getPassword().equals(user.getPassword()))
				return listUsers.get(i);
		return null;
	}
	
//	public boolean checkAdmin(String id) {
//		List<User> users = userRepository.findAll();
//		for(int i=0; i<users.size(); i++)
//			if (users.get(i).getId().equals(id) && users.get(i).getIsAdmin()==true)
//				return true;
//		return false;
//	}
//	
	@PostMapping(value = "/user/register")
	public String createUser(@RequestBody User user) {
		userRepository.insert(user);
		return "OK";
	}
	@GetMapping(value = "/user/{id}")
	public Optional<User> getInfo(@PathVariable("id") String id) {
		return userRepository.findById(id);
	}
	
	@PutMapping(value = "/user/update/{id}")
	public User updateProfile(@PathVariable("id") String id, @RequestBody User user) {
		List<User> users = userRepository.findAll();
		for(int i=0; i<users.size(); i++)
			if (users.get(i).getId().equals(id)) {
				if(user.getUsername() != null)
					users.get(i).setUsername(user.getUsername());
				if(user.getEmail() != null)
					users.get(i).setEmail(user.getEmail());
				if(user.getFirstname() != null)
					users.get(i).setFirstname(user.getFirstname());
				if(user.getLastname() != null)
					users.get(i).setLastname(user.getLastname());
				if(user.getTelephone() != null)
					users.get(i).setTelephone(user.getTelephone());
				userRepository.saveAll(users);
				return users.get(i);
			}
		return null;
	}
	
	@PutMapping(value = "/user/update/password/{id}")
	public String updatePassword(@PathVariable("id") String id, @RequestBody User user) {
		System.out.print(user.getPassword());
		List<User> users = userRepository.findAll();
		for(int i=0; i<users.size(); i++)
			if (users.get(i).getId().equals(id)) {
				if(user.getPassword() != null) {
					users.get(i).setPassword(user.getPassword());
					userRepository.saveAll(users);
					return "OK";
				}
				
			}
		return "FALSE";
	}
//	
//	@GetMapping(value = "/product/{id}")
//	public Optional<Product> detail_product(@PathVariable("id") String id) {
//		return productRepository.findById(id);
//	}
//	
	@DeleteMapping(value = "/user/delete/{id}")
	public void deleteUser(@PathVariable("id") String id) {
		userRepository.deleteById(id);
	}
}

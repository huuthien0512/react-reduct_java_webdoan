package com.example.backend.controller;

import java.util.Date;
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
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	@Autowired
	public UserRepository userRepository;
	
	//Lấy danh sách user
	@GetMapping(value = "/users")
	public List<User> getAllUser(){
		return userRepository.findAll();
	}
	
	//Đăng nhập
	@PostMapping(value = "/user/login")
	public ResponseEntity<User> login(@RequestBody User user){
		List <User> listUsers = userRepository.findAll();
		for(int i=0; i<listUsers.size(); i++)
			if(listUsers.get(i).getUsername().equals(user.getUsername()) && listUsers.get(i).getPassword().equals(user.getPassword()))
				return ResponseEntity.status(200).body(listUsers.get(i));
		return ResponseEntity.status(400).body(null);
	}
	
	//Đăng ký
	@PostMapping(value = "/user/register")
	public ResponseEntity<String> createUser(@RequestBody User user) {
		List<User> listUsers = userRepository.findAll();
		for(int i=0; i<listUsers.size(); i++) {
			if(listUsers.get(i).getUsername().equals(user.getUsername())) {
				return ResponseEntity.status(400).body("Username đã tồn tại");
			}
		}
		for(int i=0; i<listUsers.size(); i++) {
			if(listUsers.get(i).getEmail().equals(user.getEmail())) {
				return ResponseEntity.status(400).body("Email đã tồn tại");
			}
		}
		user.setTimeCreate(new Date());
		User insertedUser = userRepository.insert(user);
		return ResponseEntity.status(200).body("Đăng ký thành công");
	}
	
	
	//Lấy thông tin của user có id
	@GetMapping(value = "/user/{id}")
	public ResponseEntity<Optional<User>> getInfo(@PathVariable("id") String id) {
		return ResponseEntity.status(200).body(userRepository.findById(id));
	}
	
	//Cập nhật thông tin user
	@PutMapping(value = "/user/update/{id}")
	public ResponseEntity<User> updateProfile(@PathVariable("id") String id, @RequestBody User user) {
		List<User> listUsers = userRepository.findAll();
		for(int i=0; i<listUsers.size(); i++)
			if (listUsers.get(i).getId().equals(id)) {
				if(user.getUsername() != null)
					listUsers.get(i).setUsername(user.getUsername());
				if(user.getEmail() != null)
					listUsers.get(i).setEmail(user.getEmail());
				if(user.getFirstname() != null)
					listUsers.get(i).setFirstname(user.getFirstname());
				if(user.getLastname() != null)
					listUsers.get(i).setLastname(user.getLastname());
				if(user.getTelephone() != null)
					listUsers.get(i).setTelephone(user.getTelephone());
				userRepository.saveAll(listUsers);
				return ResponseEntity.status(200).body(listUsers.get(i));
			}
		return ResponseEntity.status(400).body(null);
	}
	
	//Cập nhật thông tin user by admin
		@PutMapping(value = "/admin/update/{id}")
		public ResponseEntity<User> updateProfileByAdmin(@PathVariable("id") String id, @RequestBody Map<String, Object> payload) {
			if (checkAdmin(payload.get("idCurrent").toString())) {
				List<User> listUsers = userRepository.findAll();
				for(int i=0; i<listUsers.size(); i++)
					if (listUsers.get(i).getId().equals(id)) {
						if(payload.get("username") != null)
							listUsers.get(i).setUsername(payload.get("username").toString());
						if(payload.get("email") != null)
							listUsers.get(i).setEmail(payload.get("email").toString());
						if(payload.get("firstname") != null)
							listUsers.get(i).setFirstname(payload.get("firstname").toString());
						if(payload.get("lastname") != null)
							listUsers.get(i).setLastname(payload.get("lastname").toString());
						if(payload.get("telephone") != null)
							listUsers.get(i).setTelephone(payload.get("telephone").toString());
						if(payload.get("isAdmin") != null)
							listUsers.get(i).setIsAdmin(Boolean.parseBoolean(payload.get("isAdmin").toString()));
						userRepository.saveAll(listUsers);
						return ResponseEntity.status(200).body(listUsers.get(i));
					}
			}
			return ResponseEntity.status(400).body(null);
		}
	
	//Cập nhật mật khẩu user
	@PutMapping(value = "/user/update/password/{id}")
	public ResponseEntity<String> updatePassword(@PathVariable("id") String id, @RequestBody Map<String, Object> payload) {
		List<User> users = userRepository.findAll();
		for(int i=0; i<users.size(); i++)
			if (users.get(i).getId().equals(id)) {
					if (users.get(i).getPassword().equals(payload.get("password").toString())) {
						users.get(i).setPassword(payload.get("newPassword").toString());
						userRepository.saveAll(users);
						return ResponseEntity.status(200).body("Đổi mật khẩu thành công");
					}else {
						return ResponseEntity.status(400).body("Mật khẩu hiện tại không đúng");
					}
					
			}
		return ResponseEntity.status(400).body("Cập nhật thất bại");
	}
	
	//Xóa user
	@DeleteMapping(value = "/user/delete/{id}")
	public void deleteUser(@PathVariable("id") String id) {
		userRepository.deleteById(id);
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

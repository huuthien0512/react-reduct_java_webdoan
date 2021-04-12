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
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BlogController {
	
	@Autowired
	public BlogRepository blogRepository;
	
	@GetMapping(value = "/blogs")
	public List<Blog> getAllBlog(){
		return blogRepository.findAll();
	}
	
	
	@PostMapping(value = "/blog/create")
	public String createBlog(@RequestBody Blog blog) {
		Blog insertedBlog = blogRepository.insert(blog);
		return "OK";
	}
	
}

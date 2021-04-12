package com.example.backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFilter;

@Document(collection = "User")
public class User {
	@Id
	private String id;
	private String username;
	private String password;
	private String email;
	private String firstname;
	private String lastname;
	private String telephone;
	private boolean isAdmin;
	private Date timeCreate;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String username, String password, String email, String firstname, String lastname, String telephone, boolean isAdmin) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.telephone = telephone;
		this.isAdmin = isAdmin;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	public Date getTimeCreate() {
		return timeCreate;
	}

	public void setTimeCreate(Date timeCreate) {
		this.timeCreate = timeCreate;
	}
	
}

package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Product")
public class Product {
	@Id
	private String id;
	private String name;
	private int quantity;
	private float price;
	private int discount;
	private boolean isNew;
	private int rating;
	private int saleCount;
	private String[] category;
	private String[] image;
	private String description;
	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(String name, int quantity, float price, int discount, boolean isNew, int rating,
			int saleCount, String[] category, String[] image, String description) {
		super();
		this.name = name;
		this.quantity = quantity;
		this.price = price;
		this.discount = discount;
		this.isNew = isNew;
		this.rating = rating;
		this.saleCount = saleCount;
		this.category = category;
		this.image = image;
		this.description = description;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public boolean getIsNew() {
		return isNew;
	}

	public void setIsNew(boolean isNew) {
		this.isNew = isNew;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public int getSaleCount() {
		return saleCount;
	}

	public void setSaleCount(int saleCount) {
		this.saleCount = saleCount;
	}

	public String[] getCategory() {
		return category;
	}

	public void setCategory(String[] strings) {
		this.category = strings;
	}

	public String[] getImage() {
		return image;
	}

	public void setImage(String[] image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}

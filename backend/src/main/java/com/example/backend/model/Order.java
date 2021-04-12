package com.example.backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Order")
public class Order {
	@Id
	private String id;
	private OrderItems[] orderItems;
	private ShippingAddress shippingAddress;
	private String paymentMethod;
	private PaymentResult paymentResult;
	private float shippingPrice;
	private float totalPrice;
	private boolean isPaid;
	private Date paidAt;
	private boolean isDelivered;
	private Date deliveredAt;
	private String note;
	private String userId;
	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Order(OrderItems[] orderItems, ShippingAddress shippingAddress, String paymentMethod,
			PaymentResult paymentResult, float shippingPrice, float totalPrice, boolean isPaid, Date paidAt,
			boolean isDelivered, Date deliveredAt, String note, String userId) {
		super();
		this.orderItems = orderItems;
		this.shippingAddress = shippingAddress;
		this.paymentMethod = paymentMethod;
		this.paymentResult = paymentResult;
		this.shippingPrice = shippingPrice;
		this.totalPrice = totalPrice;
		this.isPaid = isPaid;
		this.paidAt = paidAt;
		this.isDelivered = isDelivered;
		this.deliveredAt = deliveredAt;
		this.note = note;
		this.userId = userId;
	}
	public String getId() {
		return id;
	}
	public OrderItems[] getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(OrderItems[] orderItems) {
		this.orderItems = orderItems;
	}
	public ShippingAddress getShippingAddress() {
		return shippingAddress;
	}
	public void setShippingAddress(ShippingAddress shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public PaymentResult getPaymentResult() {
		return paymentResult;
	}
	public void setPaymentResult(PaymentResult paymentResult) {
		this.paymentResult = paymentResult;
	}
	public float getShippingPrice() {
		return shippingPrice;
	}
	public void setShippingPrice(float shippingPrice) {
		this.shippingPrice = shippingPrice;
	}
	public float getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	public boolean getIsPaid() {
		return isPaid;
	}
	public void setIsPaid(boolean isPaid) {
		this.isPaid = isPaid;
	}
	public Date getPaidAt() {
		return paidAt;
	}
	public void setPaidAt(Date paidAt) {
		this.paidAt = paidAt;
	}
	public boolean getIsDelivered() {
		return isDelivered;
	}
	public void setIsDelivered(boolean isDelivered) {
		this.isDelivered = isDelivered;
	}
	public Date getDeliveredAt() {
		return deliveredAt;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getNote() {
		return note;
	}
	public void setDeliveredAt(Date deliveredAt) {
		this.deliveredAt = deliveredAt;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
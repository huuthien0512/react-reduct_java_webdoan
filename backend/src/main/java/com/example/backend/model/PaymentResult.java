package com.example.backend.model;

import java.util.Date;

//@Document(collection = "PaymentResuls")
public class PaymentResult {
	
	private String status;
	private Date updateTime;
	private String userUpdate;
	public PaymentResult() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaymentResult(String status, Date updateTime, String userUpdate) {
		super();
		this.status = status;
		this.updateTime = updateTime;
		this.userUpdate = userUpdate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getUserUpdate() {
		return userUpdate;
	}
	public void setUserUpdate(String userUpdate) {
		this.userUpdate = userUpdate;
	}
}

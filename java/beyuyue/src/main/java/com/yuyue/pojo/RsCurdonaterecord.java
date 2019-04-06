package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;


/**
 * The persistent class for the rs_curdonaterecord database table.
 * 
 */
/**
 * 捐书订单
 * @author 吴俭
 *
 */
@Entity
@Table(name="rs_curdonaterecord")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="RsCurdonaterecord.findAll", query="SELECT r FROM RsCurdonaterecord r")
public class RsCurdonaterecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="donate_id")
	private Integer donateId;

	private String contact;

	@Column(name="deliver_type")
	private byte deliverType;

	@Column(name="donate_det")
	private String donateDet;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="donate_time")
	private Date donateTime;

	@Column(name="express_no")
	private String expressNo;

	@Column(name="express_photo")
	private String expressPhoto;

	private String isbn;

	@Column(name="order_no")
	private String orderNo;

	private String phone;

	private byte status;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JoinColumn(name="user_id")
	private BsUserinfo bsUserinfo;

	public RsCurdonaterecord() {
	}

	public Integer getDonateId() {
		return this.donateId;
	}

	public void setDonateId(Integer donateId) {
		this.donateId = donateId;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public byte getDeliverType() {
		return this.deliverType;
	}

	public void setDeliverType(byte deliverType) {
		this.deliverType = deliverType;
	}

	public String getDonateDet() {
		return this.donateDet;
	}

	public void setDonateDet(String donateDet) {
		this.donateDet = donateDet;
	}

	public Date getDonateTime() {
		return this.donateTime;
	}

	public void setDonateTime(Date donateTime) {
		this.donateTime = donateTime;
	}

	public String getExpressNo() {
		return this.expressNo;
	}

	public void setExpressNo(String expressNo) {
		this.expressNo = expressNo;
	}

	public String getExpressPhoto() {
		return this.expressPhoto;
	}

	public void setExpressPhoto(String expressPhoto) {
		this.expressPhoto = expressPhoto;
	}

	public String getIsbn() {
		return this.isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public BsUserinfo getBsUserinfo() {
		return this.bsUserinfo;
	}

	public void setBsUserinfo(BsUserinfo bsUserinfo) {
		this.bsUserinfo = bsUserinfo;
	}

}
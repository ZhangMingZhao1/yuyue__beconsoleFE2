package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;


/**
 * The persistent class for the bs_ivtuserinfo database table.
 * 
 */
/**
 * 邀请用户表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_ivtuserinfo")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsIvtuserinfo.findAll", query="SELECT b FROM BsIvtuserinfo b")
public class BsIvtuserinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ivtuserinfo_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ivtuserinfoId;

	private String address;

	private String name;

	private String phone;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="redeem_time")
	private Date redeemTime;

	private byte status;

	//bi-directional many-to-one association to BsInvitecode
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="ivtcode_id")
	private BsInvitecode bsInvitecode;

	public BsIvtuserinfo() {
	}

	public Integer getIvtuserinfoId() {
		return this.ivtuserinfoId;
	}

	public void setIvtuserinfoId(Integer ivtuserinfoId) {
		this.ivtuserinfoId = ivtuserinfoId;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getRedeemTime() {
		return this.redeemTime;
	}

	public void setRedeemTime(Date redeemTime) {
		this.redeemTime = redeemTime;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public BsInvitecode getBsInvitecode() {
		return this.bsInvitecode;
	}

	public void setBsInvitecode(BsInvitecode bsInvitecode) {
		this.bsInvitecode = bsInvitecode;
	}

}
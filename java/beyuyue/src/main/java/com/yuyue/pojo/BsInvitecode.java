package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the bs_invitecode database table.
 * 
 */
/**
 * 邀请码表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_invitecode")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsInvitecode.findAll", query="SELECT b FROM BsInvitecode b")
public class BsInvitecode implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ivtcode_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ivtcodeId;

	private String code;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="cust_name")
	private String custName;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="expire_time")
	private Date expireTime;

	@Column(name="vip_time")
	private Integer vipTime;

	@Column(name="vip_type")
	private byte vipType;

	@Transient
	private List<BsIvtuserinfo> bsIvtuserinfos;

	public BsInvitecode() {
	}

	public Integer getIvtcodeId() {
		return this.ivtcodeId;
	}

	public void setIvtcodeId(Integer ivtcodeId) {
		this.ivtcodeId = ivtcodeId;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Date getExpireTime() {
		return this.expireTime;
	}

	public void setExpireTime(Date expireTime) {
		this.expireTime = expireTime;
	}

	public Integer getVipTime() {
		return this.vipTime;
	}

	public void setVipTime(Integer vipTime) {
		this.vipTime = vipTime;
	}

	public byte getVipType() {
		return this.vipType;
	}

	public void setVipType(byte vipType) {
		this.vipType = vipType;
	}

	public List<BsIvtuserinfo> getBsIvtuserinfos() {
		return this.bsIvtuserinfos;
	}

	public void setBsIvtuserinfos(List<BsIvtuserinfo> bsIvtuserinfos) {
		this.bsIvtuserinfos = bsIvtuserinfos;
	}

	public BsIvtuserinfo addBsIvtuserinfo(BsIvtuserinfo bsIvtuserinfo) {
		getBsIvtuserinfos().add(bsIvtuserinfo);
		bsIvtuserinfo.setBsInvitecode(this);

		return bsIvtuserinfo;
	}

	public BsIvtuserinfo removeBsIvtuserinfo(BsIvtuserinfo bsIvtuserinfo) {
		getBsIvtuserinfos().remove(bsIvtuserinfo);
		bsIvtuserinfo.setBsInvitecode(null);

		return bsIvtuserinfo;
	}

}
package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the rs_usercredit database table.
 * 
 */
/**
 * 用户积分表
 * @author 吴俭
 *
 */
@Entity
@Table(name="rs_usercredit")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="RsUsercredit.findAll", query="SELECT r FROM RsUsercredit r")
public class RsUsercredit implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="usercredit_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String usercreditId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="credit_value")
	private Integer creditValue;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="operate_time")
	private Date operateTime;

	@Column(name="operator_id")
	private Integer operatorId;

	private String remark;

	private byte type;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JoinColumn(name="user_id")
	private BsUserinfo bsUserinfo;

	//bi-directional many-to-one association to RsVipplanorder
	@OneToMany(mappedBy="rsUsercredit")
	private List<RsVipplanorder> rsVipplanorders;

	public RsUsercredit() {
	}

	public String getUsercreditId() {
		return this.usercreditId;
	}

	public void setUsercreditId(String usercreditId) {
		this.usercreditId = usercreditId;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getCreditValue() {
		return this.creditValue;
	}

	public void setCreditValue(Integer creditValue) {
		this.creditValue = creditValue;
	}

	public Date getOperateTime() {
		return this.operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public Integer getOperatorId() {
		return this.operatorId;
	}

	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public byte getType() {
		return this.type;
	}

	public void setType(byte type) {
		this.type = type;
	}

	public BsUserinfo getBsUserinfo() {
		return this.bsUserinfo;
	}

	public void setBsUserinfo(BsUserinfo bsUserinfo) {
		this.bsUserinfo = bsUserinfo;
	}

	public List<RsVipplanorder> getRsVipplanorders() {
		return this.rsVipplanorders;
	}

	public void setRsVipplanorders(List<RsVipplanorder> rsVipplanorders) {
		this.rsVipplanorders = rsVipplanorders;
	}

	public RsVipplanorder addRsVipplanorder(RsVipplanorder rsVipplanorder) {
		getRsVipplanorders().add(rsVipplanorder);
		rsVipplanorder.setRsUsercredit(this);

		return rsVipplanorder;
	}

	public RsVipplanorder removeRsVipplanorder(RsVipplanorder rsVipplanorder) {
		getRsVipplanorders().remove(rsVipplanorder);
		rsVipplanorder.setRsUsercredit(null);

		return rsVipplanorder;
	}

}
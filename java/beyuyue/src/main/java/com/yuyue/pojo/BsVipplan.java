package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the bs_vipplan database table.
 * 
 */
/**
 * vip套餐表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_vipplan")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsVipplan.findAll", query="SELECT b FROM BsVipplan b")
public class BsVipplan implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="plan_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer planId;

	@Column(name="add_month")
	private Integer addMonth;

	private String description;

	@Column(name="discount_value")
	private float discountValue;

	@Column(name="plan_money")
	private float planMoney;

	@Column(name="vip_type")
	private byte vipType;

	//bi-directional many-to-one association to RsVipplanorder
	@OneToMany(mappedBy="bsVipplan")
	@JsonBackReference
	private List<RsVipplanorder> rsVipplanorders;

	public BsVipplan() {
	}

	public Integer getPlanId() {
		return this.planId;
	}

	public void setPlanId(Integer planId) {
		this.planId = planId;
	}

	public Integer getAddMonth() {
		return this.addMonth;
	}

	public void setAddMonth(Integer addMonth) {
		this.addMonth = addMonth;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getDiscountValue() {
		return this.discountValue;
	}

	public void setDiscountValue(float discountValue) {
		this.discountValue = discountValue;
	}

	public float getPlanMoney() {
		return this.planMoney;
	}

	public void setPlanMoney(float planMoney) {
		this.planMoney = planMoney;
	}

	public byte getVipType() {
		return this.vipType;
	}

	public void setVipType(byte vipType) {
		this.vipType = vipType;
	}

	public List<RsVipplanorder> getRsVipplanorders() {
		return this.rsVipplanorders;
	}

	public void setRsVipplanorders(List<RsVipplanorder> rsVipplanorders) {
		this.rsVipplanorders = rsVipplanorders;
	}

	public RsVipplanorder addRsVipplanorder(RsVipplanorder rsVipplanorder) {
		getRsVipplanorders().add(rsVipplanorder);
		rsVipplanorder.setBsVipplan(this);

		return rsVipplanorder;
	}

	public RsVipplanorder removeRsVipplanorder(RsVipplanorder rsVipplanorder) {
		getRsVipplanorders().remove(rsVipplanorder);
		rsVipplanorder.setBsVipplan(null);

		return rsVipplanorder;
	}

}
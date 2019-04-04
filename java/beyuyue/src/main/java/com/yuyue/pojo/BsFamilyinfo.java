package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the bs_familyinfo database table.
 * 
 */
/**
 * 用户家庭组表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_familyinfo")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsFamilyinfo.findAll", query="SELECT b FROM BsFamilyinfo b")
public class BsFamilyinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="family_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer familyId;

	@Column(name="family_name")
	private String familyName;

	@Column(name="family_no")
	private String familyNo;

	@Column(name="head_image")
	private String headImage;

	@Column(name="is_vip")
	private byte isVip;

	private String local;

	private String signature;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="vip_end")
	private Date vipEnd;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="vip_start")
	private Date vipStart;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="master_id")
	private BsUserinfo bsUserinfo;

	//bi-directional many-to-one association to BsUserinfo
	@OneToMany(mappedBy="bsFamilyinfo")
	private List<BsUserinfo> bsUserinfos;

	public BsFamilyinfo() {
	}

	public Integer getFamilyId() {
		return this.familyId;
	}

	public void setFamilyId(Integer familyId) {
		this.familyId = familyId;
	}

	public String getFamilyName() {
		return this.familyName;
	}

	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}

	public String getFamilyNo() {
		return this.familyNo;
	}

	public void setFamilyNo(String familyNo) {
		this.familyNo = familyNo;
	}

	public String getHeadImage() {
		return this.headImage;
	}

	public void setHeadImage(String headImage) {
		this.headImage = headImage;
	}

	public byte getIsVip() {
		return this.isVip;
	}

	public void setIsVip(byte isVip) {
		this.isVip = isVip;
	}

	public String getLocal() {
		return this.local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getSignature() {
		return this.signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public Date getVipEnd() {
		return this.vipEnd;
	}

	public void setVipEnd(Date vipEnd) {
		this.vipEnd = vipEnd;
	}

	public Date getVipStart() {
		return this.vipStart;
	}

	public void setVipStart(Date vipStart) {
		this.vipStart = vipStart;
	}

	public BsUserinfo getBsUserinfo() {
		return this.bsUserinfo;
	}

	public void setBsUserinfo(BsUserinfo bsUserinfo) {
		this.bsUserinfo = bsUserinfo;
	}

	public List<BsUserinfo> getBsUserinfos() {
		return this.bsUserinfos;
	}

	public void setBsUserinfos(List<BsUserinfo> bsUserinfos) {
		this.bsUserinfos = bsUserinfos;
	}

	public BsUserinfo addBsUserinfo(BsUserinfo bsUserinfo) {
		getBsUserinfos().add(bsUserinfo);
		bsUserinfo.setBsFamilyinfo(this);

		return bsUserinfo;
	}

	public BsUserinfo removeBsUserinfo(BsUserinfo bsUserinfo) {
		getBsUserinfos().remove(bsUserinfo);
		bsUserinfo.setBsFamilyinfo(null);

		return bsUserinfo;
	}

}
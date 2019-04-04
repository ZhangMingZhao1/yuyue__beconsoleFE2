package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the bs_userdynamic database table.
 * 
 */
/**
 * 鱼群动态表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_userdynamic")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsUserdynamic.findAll", query="SELECT b FROM BsUserdynamic b")
public class BsUserdynamic implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="dynamic_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String dynamicId;

	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	private Float score;

	private byte type;

	//bi-directional many-to-one association to BsBookinfo
	@ManyToOne
	@JsonBackReference(value = "bsBookinfo")
	@JoinColumn(name="bookinfo_id")
	private BsBookinfo bsBookinfo;
	
	@Transient
	private String bookName;

	//bi-directional many-to-one association to BsBooksubject
	@ManyToOne
	@JsonBackReference(value = "bsBooksubject")
	@JoinColumn(name="subject_id")
	private BsBooksubject bsBooksubject;

	//bi-directional many-to-one association to BsUserdynamic
	@ManyToOne
	@JsonBackReference(value = "bsUserdynamic")
	@JoinColumn(name="parent_id")
	private BsUserdynamic bsUserdynamic;

	//bi-directional many-to-one association to BsUserdynamic
	//级联删除
	@OneToMany(cascade = {CascadeType.ALL},mappedBy="bsUserdynamic")
	@JsonBackReference(value = "bsUserdynamics")
	private List<BsUserdynamic> bsUserdynamics;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JsonBackReference(value = "bsUserinfo")
	@JoinColumn(name="user_id")
	private BsUserinfo bsUserinfo;
	
	@Transient
	private String userName;

	//bi-directional many-to-one association to BsUserdynamiccmnt
	@OneToMany(cascade = {CascadeType.ALL},mappedBy="bsUserdynamic")
	@JsonBackReference(value = "bsUserdynamiccmnts")
	private List<BsUserdynamiccmnt> bsUserdynamiccmnts;

	//bi-directional many-to-one association to RsUserdynamiclike
	@OneToMany(cascade = {CascadeType.ALL},mappedBy="bsUserdynamic")
	@JsonBackReference(value = "rsUserdynamiclikes")
	private List<RsUserdynamiclike> rsUserdynamiclikes;

	public BsUserdynamic() {
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDynamicId() {
		return this.dynamicId;
	}

	public void setDynamicId(String dynamicId) {
		this.dynamicId = dynamicId;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Float getScore() {
		return this.score;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	public byte getType() {
		return this.type;
	}

	public void setType(byte type) {
		this.type = type;
	}

	public BsBookinfo getBsBookinfo() {
		return this.bsBookinfo;
	}

	public void setBsBookinfo(BsBookinfo bsBookinfo) {
		this.bsBookinfo = bsBookinfo;
	}

	public BsBooksubject getBsBooksubject() {
		return this.bsBooksubject;
	}

	public void setBsBooksubject(BsBooksubject bsBooksubject) {
		this.bsBooksubject = bsBooksubject;
	}

	public BsUserdynamic getBsUserdynamic() {
		return this.bsUserdynamic;
	}

	public void setBsUserdynamic(BsUserdynamic bsUserdynamic) {
		this.bsUserdynamic = bsUserdynamic;
	}

	public List<BsUserdynamic> getBsUserdynamics() {
		return this.bsUserdynamics;
	}

	public void setBsUserdynamics(List<BsUserdynamic> bsUserdynamics) {
		this.bsUserdynamics = bsUserdynamics;
	}

	public BsUserdynamic addBsUserdynamic(BsUserdynamic bsUserdynamic) {
		getBsUserdynamics().add(bsUserdynamic);
		bsUserdynamic.setBsUserdynamic(this);

		return bsUserdynamic;
	}

	public BsUserdynamic removeBsUserdynamic(BsUserdynamic bsUserdynamic) {
		getBsUserdynamics().remove(bsUserdynamic);
		bsUserdynamic.setBsUserdynamic(null);

		return bsUserdynamic;
	}

	public BsUserinfo getBsUserinfo() {
		return this.bsUserinfo;
	}

	public void setBsUserinfo(BsUserinfo bsUserinfo) {
		this.bsUserinfo = bsUserinfo;
	}

	public List<BsUserdynamiccmnt> getBsUserdynamiccmnts() {
		return this.bsUserdynamiccmnts;
	}

	public void setBsUserdynamiccmnts(List<BsUserdynamiccmnt> bsUserdynamiccmnts) {
		this.bsUserdynamiccmnts = bsUserdynamiccmnts;
	}

	public BsUserdynamiccmnt addBsUserdynamiccmnt(BsUserdynamiccmnt bsUserdynamiccmnt) {
		getBsUserdynamiccmnts().add(bsUserdynamiccmnt);
		bsUserdynamiccmnt.setBsUserdynamic(this);

		return bsUserdynamiccmnt;
	}

	public BsUserdynamiccmnt removeBsUserdynamiccmnt(BsUserdynamiccmnt bsUserdynamiccmnt) {
		getBsUserdynamiccmnts().remove(bsUserdynamiccmnt);
		bsUserdynamiccmnt.setBsUserdynamic(null);

		return bsUserdynamiccmnt;
	}

	public List<RsUserdynamiclike> getRsUserdynamiclikes() {
		return this.rsUserdynamiclikes;
	}

	public void setRsUserdynamiclikes(List<RsUserdynamiclike> rsUserdynamiclikes) {
		this.rsUserdynamiclikes = rsUserdynamiclikes;
	}

	public RsUserdynamiclike addRsUserdynamiclike(RsUserdynamiclike rsUserdynamiclike) {
		getRsUserdynamiclikes().add(rsUserdynamiclike);
		rsUserdynamiclike.setBsUserdynamic(this);

		return rsUserdynamiclike;
	}

	public RsUserdynamiclike removeRsUserdynamiclike(RsUserdynamiclike rsUserdynamiclike) {
		getRsUserdynamiclikes().remove(rsUserdynamiclike);
		rsUserdynamiclike.setBsUserdynamic(null);

		return rsUserdynamiclike;
	}

}
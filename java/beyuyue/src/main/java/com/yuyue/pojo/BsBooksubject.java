package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the bs_booksubject database table.
 * 
 */
/**
 * 书籍专题信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_booksubject")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsBooksubject.findAll", query="SELECT b FROM BsBooksubject b")
public class BsBooksubject implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="booksubject_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer booksubjectId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="is_show")
	private Byte isShow;

	@Column(name="limit_num")
	private Integer limitNum;

	private Integer sort;

	private String subjct_bannerUrl;

	@Column(name="subject_name")
	private String subjectName;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_time")
	private Date updateTime;

	//bi-directional many-to-one association to RsBookinsubject
	@JsonBackReference(value = "rsBookinsubjects")
	@OneToMany(mappedBy="bsBooksubject")
	private List<RsBookinsubject> rsBookinsubjects;

	public BsBooksubject() {
	}

	public Integer getBooksubjectId() {
		return this.booksubjectId;
	}

	public void setBooksubjectId(Integer booksubjectId) {
		this.booksubjectId = booksubjectId;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Byte getIsShow() {
		return this.isShow;
	}

	public void setIsShow(Byte isShow) {
		this.isShow = isShow;
	}

	public Integer getLimitNum() {
		return this.limitNum;
	}

	public void setLimitNum(Integer limitNum) {
		this.limitNum = limitNum;
	}

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getSubjct_bannerUrl() {
		return this.subjct_bannerUrl;
	}

	public void setSubjct_bannerUrl(String subjct_bannerUrl) {
		this.subjct_bannerUrl = subjct_bannerUrl;
	}

	public String getSubjectName() {
		return this.subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public List<RsBookinsubject> getRsBookinsubjects() {
		return this.rsBookinsubjects;
	}

	public void setRsBookinsubjects(List<RsBookinsubject> rsBookinsubjects) {
		this.rsBookinsubjects = rsBookinsubjects;
	}

	public RsBookinsubject addRsBookinsubject(RsBookinsubject rsBookinsubject) {
		getRsBookinsubjects().add(rsBookinsubject);
		rsBookinsubject.setBsBooksubject(this);

		return rsBookinsubject;
	}

	public RsBookinsubject removeRsBookinsubject(RsBookinsubject rsBookinsubject) {
		getRsBookinsubjects().remove(rsBookinsubject);
		rsBookinsubject.setBsBooksubject(null);

		return rsBookinsubject;
	}

}
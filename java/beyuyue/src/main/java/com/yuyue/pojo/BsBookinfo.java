package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;

/**
 * The persistent class for the bs_bookinfo database table.
 * 
 */
/**
 * 图书信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name = "bs_bookinfo")
@NamedQuery(name = "BsBookinfo.findAll", query = "SELECT b FROM BsBookinfo b")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
public class BsBookinfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "bookinfo_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookinfoId;

	private String author;

	@Column(name = "book_name")
	private String bookName;

	@Column(name = "browse_count")
	private Integer browseCount;

	@Column(name = "clc_no")
	private String clcNo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_time")
	private Date createTime;

	@Column(name = "edition_order")
	@JsonBackReference(value = "editionOrder")
	private Integer editionOrder;

	private String format;

	private String isbn;

	@Column(name = "page_count")
	@JsonBackReference(value = "pageCount")
	private Integer pageCount;

	private float price;

	@Column(name = "print_count")
	@JsonBackReference(value = "printCount")
	private Integer printCount;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "print_date")
	private Date printDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "publish_date")
	private Date publishDate;

	private byte recommend;

	private Float score;

	@Column(name = "search_count")
	private Integer searchCount;

	private String summary;

	@Column(name = "thumbnail_origin")
	private String thumbnailOrigin;

	@Column(name = "thumbnail_url")
	private String thumbnailUrl;

	@Column(name = "thumbnail_url2")
	private String thumbnailUrl2;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_time")
	private Date updateTime;

	private float weight;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonBackReference(value = "bsBookcategory")
	private BsBookcategory bsBookcategory;
	
	@Transient
	private String categoryName;

	@ManyToOne
	@JoinColumn(name = "pub_id")
	private BsPublishinfo bsPublishinfo;

	@OneToMany(mappedBy = "bsBookinfo")
	@JsonBackReference(value = "rsBookincolumns")
	private List<RsBookincolumn> rsBookincolumns;

	@OneToMany(mappedBy = "bsBookinfo")
	@JsonBackReference(value = "rsBookinsubjects")
	private List<RsBookinsubject> rsBookinsubjects;
	
	@Transient
	private List<BsBookinstore> bsBookinstores;

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public void setBrowseCount(Integer browseCount) {
		this.browseCount = browseCount;
	}

	public void setSearchCount(Integer searchCount) {
		this.searchCount = searchCount;
	}

	public void setEditionOrder(Integer editionOrder) {
		this.editionOrder = editionOrder;
	}

	public List<BsBookinstore> getBsBookinstores() {
		return bsBookinstores;
	}

	public void setBsBookinstores(List<BsBookinstore> bsBookinstores) {
		this.bsBookinstores = bsBookinstores;
	}

	public BsBookcategory getBsBookcategory() {
		return bsBookcategory;
	}

	public void setBsBookcategory(BsBookcategory bsBookcategory) {
		this.bsBookcategory = bsBookcategory;
	}

	public BsPublishinfo getBsPublishinfo() {
		return bsPublishinfo;
	}

	public void setBsPublishinfo(BsPublishinfo bsPublishinfo) {
		this.bsPublishinfo = bsPublishinfo;
	}

	public List<RsBookincolumn> getRsBookincolumns() {
		return rsBookincolumns;
	}

	public void setRsBookincolumns(List<RsBookincolumn> rsBookincolumns) {
		this.rsBookincolumns = rsBookincolumns;
	}

	public List<RsBookinsubject> getRsBookinsubjects() {
		return rsBookinsubjects;
	}

	public void setRsBookinsubjects(List<RsBookinsubject> rsBookinsubjects) {
		this.rsBookinsubjects = rsBookinsubjects;
	}

	public BsBookinfo() {
	}

	public Integer getBookinfoId() {
		return this.bookinfoId;
	}

	public void setBookinfoId(Integer bookinfoId) {
		this.bookinfoId = bookinfoId;
	}

	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getBookName() {
		return this.bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public Integer getBrowseCount() {
		return this.browseCount;
	}

	public String getClcNo() {
		return this.clcNo;
	}

	public void setClcNo(String clcNo) {
		this.clcNo = clcNo;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getEditionOrder() {
		return this.editionOrder;
	}

	public String getFormat() {
		return this.format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getIsbn() {
		return this.isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public Integer getPageCount() {
		return this.pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	public float getPrice() {
		return this.price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Integer getPrintCount() {
		return this.printCount;
	}

	public void setPrintCount(Integer printCount) {
		this.printCount = printCount;
	}

	public Date getPrintDate() {
		return this.printDate;
	}

	public void setPrintDate(Date printDate) {
		this.printDate = printDate;
	}

	public Date getPublishDate() {
		return this.publishDate;
	}

	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}

	public byte getRecommend() {
		return this.recommend;
	}

	public void setRecommend(byte recommend) {
		this.recommend = recommend;
	}

	public Float getScore() {
		return this.score;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	public Integer getSearchCount() {
		return this.searchCount;
	}

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getThumbnailOrigin() {
		return this.thumbnailOrigin;
	}

	public void setThumbnailOrigin(String thumbnailOrigin) {
		this.thumbnailOrigin = thumbnailOrigin;
	}

	public String getThumbnailUrl() {
		return this.thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public String getThumbnailUrl2() {
		return this.thumbnailUrl2;
	}

	public void setThumbnailUrl2(String thumbnailUrl2) {
		this.thumbnailUrl2 = thumbnailUrl2;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public float getWeight() {
		return this.weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

}
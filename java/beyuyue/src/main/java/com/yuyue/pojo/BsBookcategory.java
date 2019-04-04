package com.yuyue.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuyue.util.Bookinfo;


/**
 * The persistent class for the bs_bookcategory database table.
 * 
 */
/**
 * 书籍分类信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_bookcategory")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsBookcategory.findAll", query="SELECT b FROM BsBookcategory b")
public class BsBookcategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="category_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String categoryId;

	@Column(name="category_name")
	private String categoryName;

	@Column(name="parent_id")
	private String parentId;
	
	@Transient
	private List<BsBookcategory> bsBookcategorys;
	
	@Transient
	private List<Bookinfo> bsBookinfos;

	public BsBookcategory() {
	}
	
	public List<BsBookcategory> getBsBookcategorys() {
		return bsBookcategorys;
	}

	public void setBsBookcategorys(List<BsBookcategory> bsBookcategorys) {
		this.bsBookcategorys = bsBookcategorys;
	}

	public List<Bookinfo> getBsBookinfos() {
		return bsBookinfos;
	}

	public void setBsBookinfos(List<Bookinfo> bsBookinfos) {
		this.bsBookinfos = bsBookinfos;
	}

	public String getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getParentId() {
		return this.parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

}
package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the bs_picture database table.
 * 
 */
@Entity
@Table(name="bs_picture")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsPicture.findAll", query="SELECT b FROM BsPicture b")
public class BsPicture implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="pic_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer picId;

	private String description;

	@Column(name="pic_url")
	private String picUrl;

	private String sort;

	private byte status;

	private byte type;

	public BsPicture() {
	}

	public Integer getPicId() {
		return this.picId;
	}

	public void setPicId(Integer picId) {
		this.picId = picId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicUrl() {
		return this.picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	public String getSort() {
		return this.sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public byte getType() {
		return this.type;
	}

	public void setType(byte type) {
		this.type = type;
	}

}
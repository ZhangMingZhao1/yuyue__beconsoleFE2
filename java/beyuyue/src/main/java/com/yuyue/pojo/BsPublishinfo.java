package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the bs_publishinfo database table.
 * 
 */
/**
 * 出版社信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_publishinfo")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsPublishinfo.findAll", query="SELECT b FROM BsPublishinfo b")
public class BsPublishinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="pub_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pubId;

	@Column(name="pub_name")
	private String pubName;

	//bi-directional many-to-one association to BsBookinfo
	@OneToMany(mappedBy="bsPublishinfo")
	@JsonBackReference(value = "bsBookinfos")
	private List<BsBookinfo> bsBookinfos;

	public BsPublishinfo() {
	}

	public Integer getPubId() {
		return this.pubId;
	}

	public void setPubId(Integer pubId) {
		this.pubId = pubId;
	}

	public String getPubName() {
		return this.pubName;
	}

	public void setPubName(String pubName) {
		this.pubName = pubName;
	}

	public List<BsBookinfo> getBsBookinfos() {
		return this.bsBookinfos;
	}

	public void setBsBookinfos(List<BsBookinfo> bsBookinfos) {
		this.bsBookinfos = bsBookinfos;
	}

}
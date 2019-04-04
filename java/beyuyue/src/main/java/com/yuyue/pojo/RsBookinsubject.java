package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the rs_bookinsubject database table.
 * 
 */
/**
 * 专题关系表
 * @author 吴俭
 *
 */
@Entity
@Table(name="rs_bookinsubject")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="RsBookinsubject.findAll", query="SELECT r FROM RsBookinsubject r")
public class RsBookinsubject implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="bookinsubject_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookinsubjectId;

	//bi-directional many-to-one association to BsBookinfo
	@ManyToOne
	@JoinColumn(name="bookinfo_id")
	private BsBookinfo bsBookinfo;

	//bi-directional many-to-one association to BsBooksubject
	@ManyToOne
	@JoinColumn(name="booksubject_id")
	private BsBooksubject bsBooksubject;

	public RsBookinsubject() {
	}

	public Integer getBookinsubjectId() {
		return this.bookinsubjectId;
	}

	public void setBookinsubjectId(Integer bookinsubjectId) {
		this.bookinsubjectId = bookinsubjectId;
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

}
package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the rs_bookincolumn database table.
 * 
 */
/**
 * 专栏关系表
 * @author 吴俭
 *
 */
@Entity
@Table(name="rs_bookincolumn")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="RsBookincolumn.findAll", query="SELECT r FROM RsBookincolumn r")
public class RsBookincolumn implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="bookincolumn_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookincolumnId;

	//bi-directional many-to-one association to BsBookcolumn
	@ManyToOne
	@JoinColumn(name="column_id")
	private BsBookcolumn bsBookcolumn;

	//bi-directional many-to-one association to BsBookinfo
	@ManyToOne
	@JoinColumn(name="bookinfo_id")
	private BsBookinfo bsBookinfo;

	public RsBookincolumn() {
	}

	public Integer getBookincolumnId() {
		return this.bookincolumnId;
	}

	public void setBookincolumnId(Integer bookincolumnId) {
		this.bookincolumnId = bookincolumnId;
	}

	public BsBookcolumn getBsBookcolumn() {
		return this.bsBookcolumn;
	}

	public void setBsBookcolumn(BsBookcolumn bsBookcolumn) {
		this.bsBookcolumn = bsBookcolumn;
	}

	public BsBookinfo getBsBookinfo() {
		return this.bsBookinfo;
	}

	public void setBsBookinfo(BsBookinfo bsBookinfo) {
		this.bsBookinfo = bsBookinfo;
	}

}
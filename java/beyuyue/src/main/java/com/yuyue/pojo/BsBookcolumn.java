package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the bs_bookcolumn database table.
 * 
 */
/**
 * 图书专栏表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_bookcolumn")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsBookcolumn.findAll", query="SELECT b FROM BsBookcolumn b")
public class BsBookcolumn implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="column_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer columnId;

	@Column(name="column_name")
	private String columnName;

	@Column(name="limit_num")
	private Integer limitNum;

	@Column(name="short_name")
	private String shortName;

	private Integer sort;

	private byte style;

	//bi-directional many-to-one association to RsBookincolumn
	@OneToMany(mappedBy="bsBookcolumn")
	private List<RsBookincolumn> rsBookincolumns;

	public BsBookcolumn() {
	}

	public Integer getColumnId() {
		return this.columnId;
	}

	public void setColumnId(Integer columnId) {
		this.columnId = columnId;
	}

	public String getColumnName() {
		return this.columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public Integer getLimitNum() {
		return this.limitNum;
	}

	public void setLimitNum(Integer limitNum) {
		this.limitNum = limitNum;
	}

	public String getShortName() {
		return this.shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public byte getStyle() {
		return this.style;
	}

	public void setStyle(byte style) {
		this.style = style;
	}

	public List<RsBookincolumn> getRsBookincolumns() {
		return this.rsBookincolumns;
	}

	public void setRsBookincolumns(List<RsBookincolumn> rsBookincolumns) {
		this.rsBookincolumns = rsBookincolumns;
	}

	public RsBookincolumn addRsBookincolumn(RsBookincolumn rsBookincolumn) {
		getRsBookincolumns().add(rsBookincolumn);
		rsBookincolumn.setBsBookcolumn(this);

		return rsBookincolumn;
	}

	public RsBookincolumn removeRsBookincolumn(RsBookincolumn rsBookincolumn) {
		getRsBookincolumns().remove(rsBookincolumn);
		rsBookincolumn.setBsBookcolumn(null);

		return rsBookincolumn;
	}

}
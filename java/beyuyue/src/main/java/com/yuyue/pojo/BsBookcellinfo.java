package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the bs_bookcellinfo database table.
 * 
 */
/**
 * 书柜格子表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_bookcellinfo")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsBookcellinfo.findAll", query="SELECT b FROM BsBookcellinfo b")
public class BsBookcellinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cell_id")
	private Integer cellId;

	private Integer capacity;

	@Column(name="cell_code")
	private String cellCode;

	@Column(name="cell_status")
	private byte cellStatus;

	@Column(name="cell_x")
	private byte cellX;

	@Column(name="cell_y")
	private byte cellY;

	@Column(name="is_busy")
	private byte isBusy;
	
	private Integer repair;

	//bi-directional many-to-one association to BsBookcaseinfo
	@ManyToOne
	@JoinColumn(name="case_id")
	private BsBookcaseinfo bsBookcaseinfo;

	public BsBookcellinfo() {
	}

	public Integer getCellId() {
		return this.cellId;
	}

	public void setCellId(Integer cellId) {
		this.cellId = cellId;
	}

	public Integer getCapacity() {
		return this.capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public String getCellCode() {
		return this.cellCode;
	}

	public void setCellCode(String cellCode) {
		this.cellCode = cellCode;
	}

	public byte getCellStatus() {
		return this.cellStatus;
	}

	public void setCellStatus(byte cellStatus) {
		this.cellStatus = cellStatus;
	}

	public byte getCellX() {
		return this.cellX;
	}

	public void setCellX(byte cellX) {
		this.cellX = cellX;
	}

	public byte getCellY() {
		return this.cellY;
	}

	public void setCellY(byte cellY) {
		this.cellY = cellY;
	}

	public byte getIsBusy() {
		return this.isBusy;
	}

	public void setIsBusy(byte isBusy) {
		this.isBusy = isBusy;
	}

	public BsBookcaseinfo getBsBookcaseinfo() {
		return this.bsBookcaseinfo;
	}

	public void setBsBookcaseinfo(BsBookcaseinfo bsBookcaseinfo) {
		this.bsBookcaseinfo = bsBookcaseinfo;
	}

	public Integer getRepair() {
		return repair;
	}

	public void setRepair(Integer repair) {
		this.repair = repair;
	}

}
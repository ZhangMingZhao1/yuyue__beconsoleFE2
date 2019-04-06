package com.yuyue.pojo;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the bs_bookinstore database table.
 * 
 */
/**
 * 书籍库存信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_bookinstore")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsBookinstore.findAll", query="SELECT b FROM BsBookinstore b")
public class BsBookinstore implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="book_id")
	private BigInteger bookId;

	private String index_id;

	@Column(name="is_donate")
	private byte isDonate;

	private String rfid;

	private byte status;

	//bi-directional many-to-one association to BsBookinfo
	@ManyToOne
	@JoinColumn(name="bookinfo_id")
	private BsBookinfo bsBookinfo;

	//bi-directional many-to-one association to BsBookcellinfo
	@ManyToOne
	@JoinColumn(name="cell_id")
	private BsBookcellinfo bsBookcellinfo;

	//bi-directional many-to-one association to RsCurborrowrecord
	/*@OneToMany(mappedBy="bsBookinstore")
	private List<RsCurborrowrecord> rsCurborrowrecords;*/

	//bi-directional many-to-one association to RsHisborrowrecord
	/*@OneToMany(mappedBy="bsBookinstore")
	private List<RsHisborrowrecord> rsHisborrowrecords;*/

	public BsBookinstore() {
	}

	public BigInteger getBookId() {
		return this.bookId;
	}

	public void setBookId(BigInteger bookId) {
		this.bookId = bookId;
	}

	public String getIndex_id() {
		return this.index_id;
	}

	public void setIndex_id(String index_id) {
		this.index_id = index_id;
	}

	public byte getIsDonate() {
		return this.isDonate;
	}

	public void setIsDonate(byte isDonate) {
		this.isDonate = isDonate;
	}

	public String getRfid() {
		return this.rfid;
	}

	public void setRfid(String rfid) {
		this.rfid = rfid;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public BsBookinfo getBsBookinfo() {
		return this.bsBookinfo;
	}

	public void setBsBookinfo(BsBookinfo bsBookinfo) {
		this.bsBookinfo = bsBookinfo;
	}

	public BsBookcellinfo getBsBookcellinfo() {
		return this.bsBookcellinfo;
	}

	public void setBsBookcellinfo(BsBookcellinfo bsBookcellinfo) {
		this.bsBookcellinfo = bsBookcellinfo;
	}

	/*public List<RsCurborrowrecord> getRsCurborrowrecords() {
		return this.rsCurborrowrecords;
	}

	public void setRsCurborrowrecords(List<RsCurborrowrecord> rsCurborrowrecords) {
		this.rsCurborrowrecords = rsCurborrowrecords;
	}

	public RsCurborrowrecord addRsCurborrowrecord(RsCurborrowrecord rsCurborrowrecord) {
		getRsCurborrowrecords().add(rsCurborrowrecord);
		rsCurborrowrecord.setBsBookinstore(this);

		return rsCurborrowrecord;
	}

	public RsCurborrowrecord removeRsCurborrowrecord(RsCurborrowrecord rsCurborrowrecord) {
		getRsCurborrowrecords().remove(rsCurborrowrecord);
		rsCurborrowrecord.setBsBookinstore(null);

		return rsCurborrowrecord;
	}

	public List<RsHisborrowrecord> getRsHisborrowrecords() {
		return this.rsHisborrowrecords;
	}

	public void setRsHisborrowrecords(List<RsHisborrowrecord> rsHisborrowrecords) {
		this.rsHisborrowrecords = rsHisborrowrecords;
	}

	public RsHisborrowrecord addRsHisborrowrecord(RsHisborrowrecord rsHisborrowrecord) {
		getRsHisborrowrecords().add(rsHisborrowrecord);
		rsHisborrowrecord.setBsBookinstore(this);

		return rsHisborrowrecord;
	}

	public RsHisborrowrecord removeRsHisborrowrecord(RsHisborrowrecord rsHisborrowrecord) {
		getRsHisborrowrecords().remove(rsHisborrowrecord);
		rsHisborrowrecord.setBsBookinstore(null);

		return rsHisborrowrecord;
	}*/

}
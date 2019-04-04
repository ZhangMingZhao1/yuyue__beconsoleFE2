package com.yuyue.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the bs_userdynamiccmnt database table.
 * 
 */
/**
 * 鱼群动态评论表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_userdynamiccmnt")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BsUserdynamiccmnt.findAll", query="SELECT b FROM BsUserdynamiccmnt b")
public class BsUserdynamiccmnt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="comment_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String commentId;

	private String content;

	//bi-directional many-to-one association to BsUserdynamic
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="dynamic_id")
	private BsUserdynamic bsUserdynamic;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="user_id")
	private BsUserinfo bsUserinfo;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createtime;
	
	@Transient
	private String userName;

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public BsUserdynamiccmnt() {
	}

	public String getCommentId() {
		return this.commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public BsUserdynamic getBsUserdynamic() {
		return this.bsUserdynamic;
	}

	public void setBsUserdynamic(BsUserdynamic bsUserdynamic) {
		this.bsUserdynamic = bsUserdynamic;
	}

	public BsUserinfo getBsUserinfo() {
		return this.bsUserinfo;
	}

	public void setBsUserinfo(BsUserinfo bsUserinfo) {
		this.bsUserinfo = bsUserinfo;
	}

}
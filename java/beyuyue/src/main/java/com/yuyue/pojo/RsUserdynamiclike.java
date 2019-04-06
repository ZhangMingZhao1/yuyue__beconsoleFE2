package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the rs_userdynamiclike database table.
 * 
 */
/**
 * 鱼群动态点赞表
 * @author 吴俭
 *
 */
@Entity
@Table(name="rs_userdynamiclike")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="RsUserdynamiclike.findAll", query="SELECT r FROM RsUserdynamiclike r")
public class RsUserdynamiclike implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="like_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String likeId;

	//bi-directional many-to-one association to BsUserdynamic
	@ManyToOne
	@JoinColumn(name="dynamic_id")
	private BsUserdynamic bsUserdynamic;

	//bi-directional many-to-one association to BsUserinfo
	@ManyToOne
	@JoinColumn(name="user_id")
	private BsUserinfo bsUserinfo;

	public RsUserdynamiclike() {
	}

	public String getLikeId() {
		return this.likeId;
	}

	public void setLikeId(String likeId) {
		this.likeId = likeId;
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
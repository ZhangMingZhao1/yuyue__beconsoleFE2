package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the bs_userinfo database table.
 * 
 */
/**
 * 用户信息表
 * @author 吴俭
 *
 */
@Entity
@Table(name="bs_userinfo")
@NamedQuery(name="BsUserinfo.findAll", query="SELECT b FROM BsUserinfo b")
public class BsUserinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;

	@Column(name="comment_visible")
	private byte commentVisible;

	@Column(name="family_role")
	private String familyRole;

	@Column(name="grow_value")
	private Integer growValue;

	@Column(name="head_image")
	private String headImage;

	@Column(name="is_vip")
	private byte isVip;

	private String local;

	@Column(name="mobile_phone")
	private String mobilePhone;

	private String nickname;

	private String password;

	private Integer point;

	@Column(name="qq_uid")
	private String qqUid;

	@Column(name="qq_uname")
	private String qqUname;

	@Column(name="recieve_message")
	private byte recieveMessage;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="register_date")
	private Date registerDate;

	@Column(name="remind_check")
	private byte remindCheck;

	@Column(name="remind_read")
	private byte remindRead;

	private String salt;

	private byte sex;

	private String signature;

	@Column(name="sina_uid")
	private String sinaUid;

	@Column(name="sina_uname")
	private String sinaUname;

	private byte status;

	@Column(name="vip_days_remaining")
	private int vipDaysRemaining;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="vip_end")
	private Date vipEnd;

	@Column(name="vip_is_paused")
	private byte vipIsPaused;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="vip_start")
	private Date vipStart;

	@Column(name="weixin_uid")
	private String weixinUid;

	@Column(name="weixin_uname")
	private String weixinUname;

	//bi-directional many-to-one association to BsUserdynamic
	@OneToMany(mappedBy="bsUserinfo")
	private List<BsUserdynamic> bsUserdynamics;

	//bi-directional many-to-one association to BsUserdynamiccmnt
	@OneToMany(mappedBy="bsUserinfo")
	private List<BsUserdynamiccmnt> bsUserdynamiccmnts;

	//bi-directional many-to-one association to BsFamilyinfo
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="family_id")
	private BsFamilyinfo bsFamilyinfo;

	//bi-directional many-to-one association to RsUserdynamiclike
	@OneToMany(mappedBy="bsUserinfo")
	private List<RsUserdynamiclike> rsUserdynamiclikes;

	public BsUserinfo() {
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public byte getCommentVisible() {
		return this.commentVisible;
	}

	public void setCommentVisible(byte commentVisible) {
		this.commentVisible = commentVisible;
	}

	public String getFamilyRole() {
		return this.familyRole;
	}

	public void setFamilyRole(String familyRole) {
		this.familyRole = familyRole;
	}

	public int getGrowValue() {
		return this.growValue;
	}

	public void setGrowValue(int growValue) {
		this.growValue = growValue;
	}

	public String getHeadImage() {
		return this.headImage;
	}

	public void setHeadImage(String headImage) {
		this.headImage = headImage;
	}

	public byte getIsVip() {
		return this.isVip;
	}

	public void setIsVip(byte isVip) {
		this.isVip = isVip;
	}

	public String getLocal() {
		return this.local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getMobilePhone() {
		return this.mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getPoint() {
		return this.point;
	}

	public void setPoint(Integer point) {
		this.point = point;
	}

	public String getQqUid() {
		return this.qqUid;
	}

	public void setQqUid(String qqUid) {
		this.qqUid = qqUid;
	}

	public String getQqUname() {
		return this.qqUname;
	}

	public void setQqUname(String qqUname) {
		this.qqUname = qqUname;
	}

	public byte getRecieveMessage() {
		return this.recieveMessage;
	}

	public void setRecieveMessage(byte recieveMessage) {
		this.recieveMessage = recieveMessage;
	}

	public Date getRegisterDate() {
		return this.registerDate;
	}

	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}

	public byte getRemindCheck() {
		return this.remindCheck;
	}

	public void setRemindCheck(byte remindCheck) {
		this.remindCheck = remindCheck;
	}

	public byte getRemindRead() {
		return this.remindRead;
	}

	public void setRemindRead(byte remindRead) {
		this.remindRead = remindRead;
	}

	public String getSalt() {
		return this.salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public byte getSex() {
		return this.sex;
	}

	public void setSex(byte sex) {
		this.sex = sex;
	}

	public String getSignature() {
		return this.signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getSinaUid() {
		return this.sinaUid;
	}

	public void setSinaUid(String sinaUid) {
		this.sinaUid = sinaUid;
	}

	public String getSinaUname() {
		return this.sinaUname;
	}

	public void setSinaUname(String sinaUname) {
		this.sinaUname = sinaUname;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public int getVipDaysRemaining() {
		return this.vipDaysRemaining;
	}

	public void setVipDaysRemaining(int vipDaysRemaining) {
		this.vipDaysRemaining = vipDaysRemaining;
	}

	public Date getVipEnd() {
		return this.vipEnd;
	}

	public void setVipEnd(Date vipEnd) {
		this.vipEnd = vipEnd;
	}

	public byte getVipIsPaused() {
		return this.vipIsPaused;
	}

	public void setVipIsPaused(byte vipIsPaused) {
		this.vipIsPaused = vipIsPaused;
	}

	public Date getVipStart() {
		return this.vipStart;
	}

	public void setVipStart(Date vipStart) {
		this.vipStart = vipStart;
	}

	public String getWeixinUid() {
		return this.weixinUid;
	}

	public void setWeixinUid(String weixinUid) {
		this.weixinUid = weixinUid;
	}

	public String getWeixinUname() {
		return this.weixinUname;
	}

	public void setWeixinUname(String weixinUname) {
		this.weixinUname = weixinUname;
	}

	public List<BsUserdynamic> getBsUserdynamics() {
		return this.bsUserdynamics;
	}

	public void setBsUserdynamics(List<BsUserdynamic> bsUserdynamics) {
		this.bsUserdynamics = bsUserdynamics;
	}

	public BsUserdynamic addBsUserdynamic(BsUserdynamic bsUserdynamic) {
		getBsUserdynamics().add(bsUserdynamic);
		bsUserdynamic.setBsUserinfo(this);

		return bsUserdynamic;
	}

	public BsUserdynamic removeBsUserdynamic(BsUserdynamic bsUserdynamic) {
		getBsUserdynamics().remove(bsUserdynamic);
		bsUserdynamic.setBsUserinfo(null);

		return bsUserdynamic;
	}

	public List<BsUserdynamiccmnt> getBsUserdynamiccmnts() {
		return this.bsUserdynamiccmnts;
	}

	public void setBsUserdynamiccmnts(List<BsUserdynamiccmnt> bsUserdynamiccmnts) {
		this.bsUserdynamiccmnts = bsUserdynamiccmnts;
	}

	public BsUserdynamiccmnt addBsUserdynamiccmnt(BsUserdynamiccmnt bsUserdynamiccmnt) {
		getBsUserdynamiccmnts().add(bsUserdynamiccmnt);
		bsUserdynamiccmnt.setBsUserinfo(this);

		return bsUserdynamiccmnt;
	}

	public BsUserdynamiccmnt removeBsUserdynamiccmnt(BsUserdynamiccmnt bsUserdynamiccmnt) {
		getBsUserdynamiccmnts().remove(bsUserdynamiccmnt);
		bsUserdynamiccmnt.setBsUserinfo(null);

		return bsUserdynamiccmnt;
	}

	public BsFamilyinfo getBsFamilyinfo() {
		return this.bsFamilyinfo;
	}

	public void setBsFamilyinfo(BsFamilyinfo bsFamilyinfo) {
		this.bsFamilyinfo = bsFamilyinfo;
	}

	public List<RsUserdynamiclike> getRsUserdynamiclikes() {
		return this.rsUserdynamiclikes;
	}

	public void setRsUserdynamiclikes(List<RsUserdynamiclike> rsUserdynamiclikes) {
		this.rsUserdynamiclikes = rsUserdynamiclikes;
	}

	public RsUserdynamiclike addRsUserdynamiclike(RsUserdynamiclike rsUserdynamiclike) {
		getRsUserdynamiclikes().add(rsUserdynamiclike);
		rsUserdynamiclike.setBsUserinfo(this);

		return rsUserdynamiclike;
	}

	public RsUserdynamiclike removeRsUserdynamiclike(RsUserdynamiclike rsUserdynamiclike) {
		getRsUserdynamiclikes().remove(rsUserdynamiclike);
		rsUserdynamiclike.setBsUserinfo(null);

		return rsUserdynamiclike;
	}

}
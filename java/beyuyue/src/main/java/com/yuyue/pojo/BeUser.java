package com.yuyue.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the be_user database table.
 * 
 */
/**
 * 用户表
 * @author 吴俭
 *
 */
@Entity
@Table(name="be_user")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BeUser.findAll", query="SELECT b FROM BeUser b")
public class BeUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer uid;

	@Column(name = "name")
	private String userName;
	
	private String telephone;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date registrationtime;

	private byte status;
	
	private String password;

	@ManyToOne
	@JoinColumn(name="auth")
	@JsonBackReference("beRole")
	private BeRole beRole;
	
	@ManyToOne
	@JoinColumn(name="departmentid")
	private BeDepartment beDepartment;

	@ManyToOne
	@JoinColumn(name="institutionid")
	private BeInstitution beInstitution;
	
	@Transient
	private String role;
	
	@Transient
	private List<String> permissions;
	
	@Transient
	private int roleType;

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public byte getStatus() {
		return status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<String> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<String> permissions) {
		this.permissions = permissions;
	}

	public BeUser() {
	}

	public int getUid() {
		return this.uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public BeRole getBeRole() {
		return this.beRole;
	}

	public void setBeRole(BeRole beRole) {
		this.beRole = beRole;
	}

	public BeDepartment getBeDepartment() {
		return this.beDepartment;
	}

	public void setBeDepartment(BeDepartment beDepartment) {
		this.beDepartment = beDepartment;
	}

	public BeInstitution getBeInstitution() {
		return this.beInstitution;
	}

	public void setBeInstitution(BeInstitution beInstitution) {
		this.beInstitution = beInstitution;
	}
	

	public String getTelephone() {
		return this.telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
}
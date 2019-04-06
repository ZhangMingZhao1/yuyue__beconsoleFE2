package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the be_role database table.
 * 
 */
/**
 * 角色表
 * @author 吴俭
 *
 */
@Entity
@Table(name="be_role")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BeRole.findAll", query="SELECT b FROM BeRole b")
public class BeRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="explain_")
	private String explain;

	private String name;

	//bi-directional many-to-one association to BeUser
	@OneToMany(mappedBy="beRole")
	@JsonBackReference
	private List<BeUser> beUsers;
	
	@Transient
	private List<RsRolepermission> rsRolepermissions;

	public BeRole() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getExplain() {
		return this.explain;
	}

	public void setExplain(String explain) {
		this.explain = explain;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<BeUser> getBeUsers() {
		return this.beUsers;
	}

	public void setBeUsers(List<BeUser> beUsers) {
		this.beUsers = beUsers;
	}

	public BeUser addBeUser(BeUser beUser) {
		getBeUsers().add(beUser);
		beUser.setBeRole(this);

		return beUser;
	}

	public BeUser removeBeUser(BeUser beUser) {
		getBeUsers().remove(beUser);
		beUser.setBeRole(null);

		return beUser;
	}

	public List<RsRolepermission> getRsRolepermissions() {
		return rsRolepermissions;
	}

	public void setRsRolepermissions(List<RsRolepermission> rsRolepermissions) {
		this.rsRolepermissions = rsRolepermissions;
	}

}
package com.yuyue.pojo;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the be_permission database table.
 * 
 */
/**
 * 权限表
 * @author 吴俭
 *
 */
@Entity
@Table(name="be_permission")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer"})
@NamedQuery(name="BePermission.findAll", query="SELECT b FROM BePermission b")
public class BePermission implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name="desc_")
	private String desc;

	private String name;

	//bi-directional many-to-one association to RsRolepermission
	@OneToMany(mappedBy="bePermission")
	@JsonBackReference
	private List<RsRolepermission> rsRolepermissions;

	public BePermission() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDesc() {
		return this.desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<RsRolepermission> getRsRolepermissions() {
		return this.rsRolepermissions;
	}

	public void setRsRolepermissions(List<RsRolepermission> rsRolepermissions) {
		this.rsRolepermissions = rsRolepermissions;
	}

	public RsRolepermission addRsRolepermission(RsRolepermission rsRolepermission) {
		getRsRolepermissions().add(rsRolepermission);
		rsRolepermission.setBePermission(this);

		return rsRolepermission;
	}

	public RsRolepermission removeRsRolepermission(RsRolepermission rsRolepermission) {
		getRsRolepermissions().remove(rsRolepermission);
		rsRolepermission.setBePermission(null);

		return rsRolepermission;
	}

}
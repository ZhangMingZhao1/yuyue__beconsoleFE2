package com.yuyue.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeUserDAO;
import com.yuyue.dao.RsRolepermissionDAO;
import com.yuyue.pojo.BeUser;
import com.yuyue.pojo.RsRolepermission;
import com.yuyue.util.Page4Navigator;

@Service
public class BeUserService {

	@Autowired
	private BeUserDAO beUserDAO;
	
	@Autowired
	private BeRoleService beRoleService;
	
	@Autowired
	private RsRolepermissionDAO rsRolepermissionDAO;
	
	public BeUser login(String name, String password) {
		BeUser bu = beUserDAO.getByUserNameAndPassword(name, password);
		if(bu == null)
			return null;
		setRole(bu);
		setPermission(bu);
		return bu;
	}
	
	public int changePassword(BeUser beUser) {
		BeUser bu = beUserDAO.save(beUser);
		return bu.getUid();
	}
	
	public List<BeUser> list(){
		List<BeUser> bus = beUserDAO.findAll();
		setRole(bus);
		setPermission(bus);
		setPasswordAsNull(bus);
		return bus;
	}
	
	public Page4Navigator<BeUser> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"uid");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BeUser> pageFromJPA = beUserDAO.findAll(pageable);
		Page4Navigator<BeUser> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setRole(bus.getContent());
		setPermission(bus.getContent());
		setPasswordAsNull(bus.getContent());
		return bus;
	}
	
	public void setPasswordAsNull(List<BeUser> bus) {
		for(BeUser bu : bus)
			setPasswordAsNull(bu);
	}
	
	public void setPasswordAsNull(BeUser be) {
		be.setPassword(null);
	}
	
	public BeUser getUserPermission(int id) {
		BeUser bu = beUserDAO.getOne(id);
		setRole(bu);
		setPermission(bu);
		return bu;
	}
	
	public void setRole(BeUser bu) {
		bu.setRole(beRoleService.getById(bu.getBeRole().getId()).getName());
		bu.setRoleType(bu.getBeRole().getId());
	}
	
	public void setRole(List<BeUser> bus) {
		for(BeUser bu : bus)
			setRole(bu);
	}
	
	public void setPermission(BeUser bu) {
		List<RsRolepermission> rrps = rsRolepermissionDAO.findByBeRole(bu.getBeRole());
		List<String> permissions = new ArrayList<>();
		for(RsRolepermission rrp : rrps) {
			permissions.add(rrp.getBePermission().getName());
		}
		bu.setPermissions(permissions);
	}
	
	public void setPermission(List<BeUser> bus) {
		for(BeUser bu : bus)
			setPermission(bu);
	}
	
}

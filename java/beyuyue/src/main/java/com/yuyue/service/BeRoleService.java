package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeRoleDAO;
import com.yuyue.pojo.BeRole;

@Service
public class BeRoleService {
	
	@Autowired
	private BeRoleDAO beRoleDAO;
	
	public List<BeRole> list(){
		return beRoleDAO.findAll();
	}
	
	public BeRole getPermission(String roleName) {
		List<BeRole> br = beRoleDAO.findByName(roleName);
		if(br == null || br.isEmpty())
			return null;
		return br.get(0);
	}
	
	public BeRole getById(int id) {
		return beRoleDAO.getOne(id);
	}

}

package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsRolepermissionDAO;
import com.yuyue.pojo.BeRole;
import com.yuyue.pojo.BeUser;
import com.yuyue.pojo.RsRolepermission;

@Service
public class RsRolepermissionService {

	@Autowired
	private RsRolepermissionDAO rsRolepermissionDAO;	
	
	public List<RsRolepermission> list(){
		return rsRolepermissionDAO.findAll();
	}
	
	public void setRolepermission(BeRole beRole) {
		beRole.setRsRolepermissions(rsRolepermissionDAO.findByBeRole(beRole));
	}
	
	public void setRolepermission(List<BeRole> brs) {
		for(BeRole br : brs) {
			setRolepermission(br);
		}
	}
	
	public void setuRolepermission(List<BeUser> bus) {
		for(BeUser bu : bus) {
			setuRolepermission(bu);
		}
	}
	
	public void setuRolepermission(BeUser beUser) {
		beUser.getBeRole().setRsRolepermissions(rsRolepermissionDAO.findByBeRole(beUser.getBeRole()));
	}
	
}

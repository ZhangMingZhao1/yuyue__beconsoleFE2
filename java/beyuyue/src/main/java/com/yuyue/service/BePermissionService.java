package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BePermissionDAO;
import com.yuyue.pojo.BePermission;

@Service
public class BePermissionService {

	@Autowired
	private BePermissionDAO bePermissionDAO;
	
	public List<BePermission> list(){
		return bePermissionDAO.findAll();
	}
	
}

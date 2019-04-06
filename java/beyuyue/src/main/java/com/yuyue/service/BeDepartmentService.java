package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeDepartmentDAO;

@Service
public class BeDepartmentService {

	@Autowired
	private BeDepartmentDAO beDepartmentDAO;
	
}

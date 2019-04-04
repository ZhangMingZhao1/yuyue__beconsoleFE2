package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsFamilyinfoDAO;
import com.yuyue.pojo.BsFamilyinfo;

@Service
public class BsFamilyinfoService {

	@Autowired
	private BsFamilyinfoDAO bsFamilyinfoDAO;
	
	public List<BsFamilyinfo> list(){
		return bsFamilyinfoDAO.findAll();
	}
	
}

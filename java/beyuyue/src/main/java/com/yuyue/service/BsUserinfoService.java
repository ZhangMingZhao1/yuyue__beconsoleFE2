package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsUserinfoDAO;
import com.yuyue.pojo.BsUserinfo;
import com.yuyue.pojo.RsCurborrowrecord;

@Service
public class BsUserinfoService {

	@Autowired
	private BsUserinfoDAO bsUserinfoDAO;
	
	public List<BsUserinfo> list(){
		return bsUserinfoDAO.findAll();
	}
	
	public void setUserinfoNull(RsCurborrowrecord rsCurborrowrecord) {
		rsCurborrowrecord.setBsUserinfo(null);
	}
	
	public void setUserinfoNull(List<RsCurborrowrecord> rcbs) {
		for(RsCurborrowrecord rcb : rcbs) {
			setUserinfoNull(rcb);
		}
	}
	
}

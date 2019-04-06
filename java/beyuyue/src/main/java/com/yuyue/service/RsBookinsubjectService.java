package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsBookinsubjectDAO;
import com.yuyue.pojo.BsBooksubject;
import com.yuyue.pojo.RsBookinsubject;

@Service
public class RsBookinsubjectService{

	@Autowired
	private RsBookinsubjectDAO rsBookinsubjectDAO;
	
	public List<RsBookinsubject> getByBsBooksubject(BsBooksubject bsBooksubject){
		return rsBookinsubjectDAO.findByBsBooksubject(bsBooksubject);
	}

	public int delete(int bookinsubjectId) {
		try {
			rsBookinsubjectDAO.delete(bookinsubjectId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
	public int addBookinsubject(RsBookinsubject rsBookinsubject) {
		RsBookinsubject rbs = rsBookinsubjectDAO.save(rsBookinsubject);
		return rbs.getBookinsubjectId();
	}
	
}

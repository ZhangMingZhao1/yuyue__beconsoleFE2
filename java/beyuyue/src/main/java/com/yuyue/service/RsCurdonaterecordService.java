package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsCurdonaterecordDAO;
import com.yuyue.pojo.RsCurdonaterecord;
import com.yuyue.util.Page4Navigator;

@Service
public class RsCurdonaterecordService {

	@Autowired
	private RsCurdonaterecordDAO rsCurdonaterecordDAO;
	
	public Page4Navigator<RsCurdonaterecord> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"donateId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsCurdonaterecord> pageFromJPA = rsCurdonaterecordDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public int addCurdonaterecord(RsCurdonaterecord rsCurdonaterecord) {
		RsCurdonaterecord rcd = rsCurdonaterecordDAO.save(rsCurdonaterecord);
		return rcd.getDonateId();
	}
	
	public int updateCurdonaterecord(RsCurdonaterecord rsCurdonaterecord) {
		RsCurdonaterecord rcd = rsCurdonaterecordDAO.save(rsCurdonaterecord);
		return rcd.getDonateId();
	}
	
	public RsCurdonaterecord findRsCurdonaterecord(int donateId) {
		return rsCurdonaterecordDAO.findOne(donateId);
	}
	
}

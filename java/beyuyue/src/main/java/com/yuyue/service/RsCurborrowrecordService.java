package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsCurborrowrecordDAO;
import com.yuyue.pojo.RsCurborrowrecord;
import com.yuyue.util.Page4Navigator;

@Service
public class RsCurborrowrecordService {

	@Autowired
	private RsCurborrowrecordDAO rsCurborrowrecordDAO;
	
	public Page4Navigator<RsCurborrowrecord> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"borrowId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsCurborrowrecord> pageFromJPA = rsCurborrowrecordDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public int addCurborrowrecord(RsCurborrowrecord rsCurborrowrecord) {
		RsCurborrowrecord rcb = rsCurborrowrecordDAO.save(rsCurborrowrecord);
		return rcb.getBorrowId();
	}
	
	public int updateCurborrowrecord(RsCurborrowrecord rsCurborrowrecord) {
		RsCurborrowrecord rcb = rsCurborrowrecordDAO.save(rsCurborrowrecord);
		return rcb.getBorrowId();
	}
	
	public RsCurborrowrecord getCurborrowrecord(int borrowId) {
		return rsCurborrowrecordDAO.findOne(borrowId);
	}
	
}

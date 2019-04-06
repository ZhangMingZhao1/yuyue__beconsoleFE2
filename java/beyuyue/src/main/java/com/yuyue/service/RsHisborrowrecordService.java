package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsHisborrowrecordDAO;
import com.yuyue.pojo.RsHisborrowrecord;
import com.yuyue.util.Page4Navigator;

@Service
public class RsHisborrowrecordService {

	@Autowired
	private RsHisborrowrecordDAO rsHisborrowrecordDAO;
	
	public Page4Navigator<RsHisborrowrecord> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"borrowId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsHisborrowrecord> pageFromJPA = rsHisborrowrecordDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public int addHisborrowrecord(RsHisborrowrecord rsHisborrowrecord) {
		RsHisborrowrecord rhb = rsHisborrowrecordDAO.save(rsHisborrowrecord);
		return rhb.getBorrowId();
	}
	
	public int updateHisborrowrecord(RsHisborrowrecord rsHisborrowrecord) {
		RsHisborrowrecord rhb = rsHisborrowrecordDAO.save(rsHisborrowrecord);
		return rhb.getBorrowId();
	}
	
	public RsHisborrowrecord getHisborrowrecord(int borrowId) {
		return rsHisborrowrecordDAO.findOne(borrowId);
	}
	
}

package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsVipplanorderDAO;
import com.yuyue.pojo.RsVipplanorder;
import com.yuyue.util.Page4Navigator;

@Service
public class RsVipplanorderService {

	@Autowired
	private RsVipplanorderDAO rsVipplanorderDAO;
	
	public Page4Navigator<RsVipplanorder> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"planorderId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsVipplanorder> pageFromJPA = rsVipplanorderDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public Page4Navigator<RsVipplanorder> listBystatus(byte status, int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"planorderId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsVipplanorder> pageFromJPA = rsVipplanorderDAO.findByStatus(status, pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
}

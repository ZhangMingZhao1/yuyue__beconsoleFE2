package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.RsUsercreditDAO;
import com.yuyue.pojo.RsUsercredit;
import com.yuyue.util.Page4Navigator;

@Service
public class RsUsercreditService {

	@Autowired
	private RsUsercreditDAO rsUsercreditDAO;
	
	public Page4Navigator<RsUsercredit> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"usercreditId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<RsUsercredit> pageFromJPA = rsUsercreditDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
}

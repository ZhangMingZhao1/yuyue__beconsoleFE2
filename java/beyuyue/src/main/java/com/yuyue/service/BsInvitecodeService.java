package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsInvitecodeDAO;
import com.yuyue.pojo.BsInvitecode;
import com.yuyue.util.Page4Navigator;

@Service
public class BsInvitecodeService {

	@Autowired
	private BsInvitecodeDAO bsInvitecodeDAO;
	
	public Page4Navigator<BsInvitecode> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"ivtcodeId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsInvitecode> pageFromJPA = bsInvitecodeDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
}

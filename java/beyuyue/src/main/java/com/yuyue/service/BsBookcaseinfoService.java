package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsBookcaseinfoDAO;
import com.yuyue.pojo.BsBookcaseinfo;
import com.yuyue.util.Page4Navigator;

@Service
public class BsBookcaseinfoService {

	@Autowired
	private BsBookcaseinfoDAO bsBookcaseinfoDAO;
	
	public int getAllocation() {
		List<BsBookcaseinfo> bbs = bsBookcaseinfoDAO.findByAllocation(1);
		if(bbs == null || bbs.isEmpty())
			return 0;
		return bbs.size();
	}
	
	public Page4Navigator<BsBookcaseinfo> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"caseId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsBookcaseinfo> pageFromJPA = bsBookcaseinfoDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public int addBookcaseinfo(BsBookcaseinfo bbc) {
		BsBookcaseinfo bb = bsBookcaseinfoDAO.save(bbc);
		return bb.getCaseId();
	}
	
	public int updateBookcaseinfo(BsBookcaseinfo bbc) {
		BsBookcaseinfo bb = bsBookcaseinfoDAO.save(bbc);
		return bb.getCaseId();
	}
	
	public BsBookcaseinfo getBookcaseinfo(int caseId) {
		return bsBookcaseinfoDAO.findOne(caseId);
	}
	
}

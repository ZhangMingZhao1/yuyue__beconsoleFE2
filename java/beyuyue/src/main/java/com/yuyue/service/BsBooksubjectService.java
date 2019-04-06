package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.yuyue.dao.BsBooksubjectDAO;
import com.yuyue.pojo.BsBooksubject;
import com.yuyue.util.Page4Navigator;

@Service
public class BsBooksubjectService {

	@Autowired
	private BsBooksubjectDAO bsBooksubjectDAO;
	
	public Page4Navigator<BsBooksubject> list(int start, int size,int navigatePages){
		Sort ssort = new Sort(Sort.Direction.DESC,"isShow");
		Sort sort = new Sort(Sort.Direction.ASC,"sort").and(ssort);
    	Pageable pageable = new PageRequest(start, size, sort);   
    	Page<BsBooksubject> pageFromJPA = bsBooksubjectDAO.findAll(pageable);
    	return new Page4Navigator<>(pageFromJPA,navigatePages);
	}
	
	public int addSubject(BsBooksubject bsBooksubject) {
		BsBooksubject bs = bsBooksubjectDAO.save(bsBooksubject);
		return bs.getBooksubjectId();
	}
	
	public int updateSubject(BsBooksubject bsBooksubject) {
		BsBooksubject bs = bsBooksubjectDAO.save(bsBooksubject);
		return bs.getBooksubjectId();
		
	}
	
	public BsBooksubject getSubject(int id) {
		return bsBooksubjectDAO.findOne(id);
	}
	
	public int deleteSubject(int booksubjectId) {
		try {
			bsBooksubjectDAO.delete(booksubjectId);
			return 1;
		} catch (Exception e) {
			return 0;
		} 
	}
	
}

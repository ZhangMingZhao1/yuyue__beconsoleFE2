package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsPublishinfoDAO;
import com.yuyue.pojo.BsPublishinfo;
import com.yuyue.util.Page4Navigator;

@Service
public class BsPublishinfoService {

	@Autowired
	private BsPublishinfoDAO bsPublishinfoDAO;
	
	public Page4Navigator<BsPublishinfo> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC, "pubId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsPublishinfo> pageFromJPA = bsPublishinfoDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public Page4Navigator<BsPublishinfo> list(int start, int size, int navigatePages, String keyword){
		Sort sort = new Sort(Sort.Direction.DESC, "pubId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsPublishinfo> pageFromJPA = bsPublishinfoDAO.findByPubNameLike("%"+keyword+"%",pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public BsPublishinfo getPublishinfo(int pubId) {
		return bsPublishinfoDAO.findOne(pubId);
	}
	
	public int addPublishinfo(BsPublishinfo bpi) {
		BsPublishinfo bp = bsPublishinfoDAO.save(bpi);
		return bp.getPubId();
	}
	
	public int updatePublishinfo(BsPublishinfo bpi) {
		BsPublishinfo bp = bsPublishinfoDAO.save(bpi);
		return bp.getPubId();
	}
	
	public int deletePublishinfo(int pubId) {
		try {
			bsPublishinfoDAO.delete(pubId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
		
	}
	
}

package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsPictureDAO;
import com.yuyue.pojo.BsPicture;
import com.yuyue.util.Page4Navigator;

@Service
public class BsPictureService {

	@Autowired
	private BsPictureDAO bsPictureDAO;
	
	public Page4Navigator<BsPicture> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"picId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsPicture> pageFromJPA = bsPictureDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public int update(BsPicture bsPicture) {
		BsPicture bp = bsPictureDAO.save(bsPicture);
		return bp.getPicId();
	}
	
	public int delete(int picId) {
		try {
			bsPictureDAO.delete(picId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
	public int add(BsPicture bsPicture) {
		BsPicture bp = bsPictureDAO.save(bsPicture);
		return bp.getPicId();
	}
	
	public int changeStatus(byte status,Integer picId) {
		BsPicture bp = bsPictureDAO.findOne(picId);
		if(bp.getStatus() == 1)
			bp.setStatus((byte) 0);
		else
			bp.setStatus((byte) 1);
		bp = bsPictureDAO.save(bp);
		return bp.getPicId();
	}
	
	public BsPicture get(int picId) {
		return bsPictureDAO.findOne(picId);
	}
	
}

package com.yuyue.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsUserdynamiccmntDAO;
import com.yuyue.pojo.BsUserdynamiccmnt;
import com.yuyue.util.Page4Navigator;

@Service
public class BsUserdynamiccmntService {

	@Autowired
	private BsUserdynamiccmntDAO bsUserdynamiccmntDAO;
	
	public Page4Navigator<BsUserdynamiccmnt> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"createtime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamiccmnt> pageFromJPA = bsUserdynamiccmntDAO.findAll(pageable);
		Page4Navigator<BsUserdynamiccmnt> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setUserName(bus.getContent());
		return bus;
	}
	
	public Page4Navigator<BsUserdynamiccmnt> list(int start, int size, int navigatePages, String content, String userName,
			Date starttime, Date endtime){
		Sort sort = new Sort(Sort.Direction.DESC,"createtime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamiccmnt> pageFromJPA = bsUserdynamiccmntDAO.queryByContentLikeAndNicknameLikeAndCreateTimeBetween
				("%"+content+"%", "%"+userName+"%", starttime, endtime, pageable);
		Page4Navigator<BsUserdynamiccmnt> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setUserName(bus.getContent());
		return bus;
	}
	
	public Page4Navigator<BsUserdynamiccmnt> findByDynamicId(int start, int size, int navigatePages, String dynamicId, 
			String content, String userName, Date starttime, Date endtime){
		Sort sort = new Sort(Sort.Direction.DESC,"createtime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamiccmnt> pageFromJPA = bsUserdynamiccmntDAO.queryByDynamicIdAndContentLikeAndNicknameLikeAndCreateTimeBetween
				(dynamicId, "%"+content+"%", "%"+userName+"%", starttime, endtime, pageable);
		Page4Navigator<BsUserdynamiccmnt> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setUserName(bus.getContent());
		return bus;
	}
	
	public void setUserName(List<BsUserdynamiccmnt> bus) {
		for(BsUserdynamiccmnt bu : bus)
			setUserName(bu);
	}
	
	public void setUserName(BsUserdynamiccmnt bu) {
		if(bu.getBsUserinfo()!=null)
			bu.setUserName(bu.getBsUserinfo().getNickname());
	}
	
	public int delete(String commentId) {
		try {
			bsUserdynamiccmntDAO.delete(commentId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
	public int deletemore(List<String> conmmentIds) {
		int i = 0;
		for(String commentId : conmmentIds) {
			int flag = delete(commentId);
			i += flag;
		}
		return i;	
	}
	
}

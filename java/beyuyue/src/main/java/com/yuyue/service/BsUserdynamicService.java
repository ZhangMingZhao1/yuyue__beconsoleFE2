package com.yuyue.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsUserdynamicDAO;
import com.yuyue.pojo.BsUserdynamic;
import com.yuyue.pojo.RsHisborrowrecord;
import com.yuyue.pojo.RsUsercredit;
import com.yuyue.util.Page4Navigator;

@Service
public class BsUserdynamicService {

	@Autowired
	private BsUserdynamicDAO bsUserdynamicDAO;
	
	public Page4Navigator<BsUserdynamic> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"createTime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamic> pageFromJPA = bsUserdynamicDAO.findByTypeNot((byte)3,pageable);
		Page4Navigator<BsUserdynamic> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setBookNameAndUserName(bus.getContent());
		return bus;
	}
	
	public Page4Navigator<BsUserdynamic> list(int start, int size, int navigatePages, String bookName,
			String content, String nickname, Date starttime, Date endtime){
		Sort sort = new Sort(Sort.Direction.DESC,"createTime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamic> pageFromJPA = bsUserdynamicDAO.queryByBookNameLikeAndContentLikeAndNicknameLikeAndCreateTimeBetweenTypeNot
				("%"+bookName+"%", "%"+content+"%", "%"+nickname+"%", starttime, endtime, pageable);
		Page4Navigator<BsUserdynamic> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setBookNameAndUserName(bus.getContent());
		return bus;
	}
	
	public Page4Navigator<BsUserdynamic> list(int start, int size, int navigatePages,
			String content, String nickname, Date starttime, Date endtime){
		Sort sort = new Sort(Sort.Direction.DESC,"createTime");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsUserdynamic> pageFromJPA = bsUserdynamicDAO.queryByContentLikeAndNicknameLikeAndCreateTimeBetweenTypeEquals
				("%"+content+"%", "%"+nickname+"%", starttime, endtime, pageable);
		Page4Navigator<BsUserdynamic> bus = new Page4Navigator<>(pageFromJPA, navigatePages);
		setBookNameAndUserName(bus.getContent());
		return bus;
	}
	
	public BsUserdynamic getUserdynamic(String dynamicId) {
		return bsUserdynamicDAO.getOne(dynamicId);
	}
	
	public int delete(String dynamicId) {
		try {
			bsUserdynamicDAO.delete(dynamicId);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
	public int deletemore(List<String> dynamicIds) {
		int i = 0;
		for(String dynamicId : dynamicIds) {
			int flag = delete(dynamicId);
			i += flag;
		}
		return i;
	}
	
	public void setUserdynamicNull(RsHisborrowrecord rsHisborrowrecord) {
		rsHisborrowrecord.getBsUserinfo().setBsUserdynamics(null);
	}
	
	public void setUserdynamicNull(List<RsHisborrowrecord> rhbs) {
		for(RsHisborrowrecord rhb : rhbs) {
			setUserdynamicNull(rhb);
		}
	}
	
	public void setUsercreditUserdynamicNull(RsUsercredit rsUsercredit) {
		rsUsercredit.getBsUserinfo().setBsUserdynamics(null);
	}
	
	public void setUsercreditUserdynamicNull(List<RsUsercredit> rucs) {
		for(RsUsercredit ruc : rucs)
			setUsercreditUserdynamicNull(ruc);
	}
	
	public void setBookNameAndUserName(List<BsUserdynamic> bus) {
		for(BsUserdynamic bu : bus)
			setBookNameAndUserName(bu);
	}
	
	public void setBookNameAndUserName(BsUserdynamic bu) {
		if(bu.getBsBookinfo()!=null)
		bu.setBookName(bu.getBsBookinfo().getBookName());
		if(bu.getBsUserinfo()!=null)
		bu.setUserName(bu.getBsUserinfo().getNickname());
	}
	
}

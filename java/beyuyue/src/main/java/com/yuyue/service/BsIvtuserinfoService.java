package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsIvtuserinfoDAO;
import com.yuyue.pojo.BsInvitecode;

@Service
public class BsIvtuserinfoService {

	@Autowired
	private BsIvtuserinfoDAO bsIvtuserinfoDAO;
	
	public void setBsIvtuserinfo(BsInvitecode bsInvitecode) {
		bsInvitecode.setBsIvtuserinfos(bsIvtuserinfoDAO.findByBsInvitecode(bsInvitecode));;
	}
	
	public void setBsIvtuserinfo(List<BsInvitecode> bics) {
		for(BsInvitecode bic : bics) {
			setBsIvtuserinfo(bic);
		}
	}
	
}

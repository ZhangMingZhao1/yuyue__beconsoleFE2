package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsBookcellinfoDAO;
import com.yuyue.pojo.BsBookcellinfo;
import com.yuyue.pojo.BsBookinstore;
import com.yuyue.pojo.RsHisborrowrecord;

@Service
public class BsBookcellinfoService {

	@Autowired
	private BsBookcellinfoDAO bsBookcellinfoDAO;
	
	public int getRepair() {
		List<BsBookcellinfo> bbs = bsBookcellinfoDAO.findByRepair(1);
		if(bbs == null || bbs.isEmpty())
			return 0;
		return bbs.size();
	}
	
	public BsBookcellinfo getBookcellinfo(int cellId) {
		return bsBookcellinfoDAO.findOne(cellId);
	}
	
	public int addBookcellinfo(BsBookcellinfo bbc) {
		BsBookcellinfo bb = bsBookcellinfoDAO.save(bbc);
		return bb.getCellId();
	}
	
	public int updateBookcellinfo(BsBookcellinfo bbc) {
		BsBookcellinfo bb = bsBookcellinfoDAO.save(bbc);
		return bb.getCellId();
	}
	
	public void setBookcellinfo(BsBookinstore bbs) {
		
	}
	
	public void setBookcellinfo(List<BsBookinstore> bbss) {
		for(BsBookinstore bbs : bbss)
			setBookcellinfo(bbs);
	}
	
	public void setBookcellinfoNull(RsHisborrowrecord rhb) {
		rhb.getBsBookinstore().setBsBookcellinfo(null);
	}
	
	public void setBookcellinfoNull(List<RsHisborrowrecord> rhbs) {
		for(RsHisborrowrecord rhb : rhbs)
			setBookcellinfoNull(rhb);
	}
	
}

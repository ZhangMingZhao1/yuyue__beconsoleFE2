package com.yuyue.service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsBookinstoreDAO;
import com.yuyue.pojo.BsBookinfo;
import com.yuyue.pojo.BsBookinstore;
import com.yuyue.util.Page4Navigator;

@Service
public class BsBookinstoreService {

	@Autowired
	private BsBookinstoreDAO bsBookinstoreDAO;
	
	public Page4Navigator<BsBookinstore> list(int start, int size, int navigatePages){
		Sort sort = new Sort(Sort.Direction.DESC,"bookId");
		Pageable pageable= new PageRequest(start, size, sort);
		Page<BsBookinstore> pageFromJPA = bsBookinstoreDAO.findAll(pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public Page4Navigator<BsBookinstore> list(int start, int size, int navigatePages, String keyword){
		Sort sort = new Sort(Sort.Direction.DESC,"bookId");
		Pageable pageable = new PageRequest(start, size, sort);
		Page<BsBookinstore> pageFromJPA = bsBookinstoreDAO.queryByBookNameLikeOrIsbnLikeOrAuthorLike("%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%",pageable);
		return new Page4Navigator<>(pageFromJPA, navigatePages);
	}
	
	public BigInteger addBookinstore(BsBookinstore bbs) {
		BsBookinstore bb = bsBookinstoreDAO.save(bbs);
		return bb.getBookId();
	}
	
	public BigInteger updateBookinstore(BsBookinstore bbs) {
		BsBookinstore bb = bsBookinstoreDAO.save(bbs);
		return bb.getBookId();
	}
	
	public BsBookinstore getBookinstore(int bookId) {
		return bsBookinstoreDAO.findOne(bookId);
	}
	
	public void setBsBookinstore(BsBookinfo bbi) {
		List<BsBookinstore> bsBookinstores = bsBookinstoreDAO.findByBsBookinfo(bbi);
		bbi.setBsBookinstores(bsBookinstores);
		for(BsBookinstore bbs : bsBookinstores)
			bbs.setBsBookinfo(null);
	}
	
	public void setBsBookinstore(List<BsBookinfo> bbis) {
		for(BsBookinfo bbi : bbis) {
			setBsBookinstore(bbi);
		}
	}
	
}

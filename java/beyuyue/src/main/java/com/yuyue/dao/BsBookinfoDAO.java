package com.yuyue.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsBookcategory;
import com.yuyue.pojo.BsBookinfo;

public interface BsBookinfoDAO extends JpaRepository<BsBookinfo, Integer> {

	public Page<BsBookinfo> findByBookNameLikeOrIsbnLikeOrAuthorLike(String bookName, String isbn, String author, Pageable pageable);
	
	public List<BsBookinfo> findByBsBookcategory(BsBookcategory bsBookcategory);
	
	public List<BsBookinfo> findByBsBookcategoryAndBookNameLike(BsBookcategory bsBookcategory, String bookName);
	
}

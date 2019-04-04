package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsBookcategory;

public interface BsBookcategoryDAO extends JpaRepository<BsBookcategory, String> {

	public List<BsBookcategory> findByParentId(String parentId);
	
}

package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsBookcaseinfo;

public interface BsBookcaseinfoDAO extends JpaRepository<BsBookcaseinfo, Integer> {

	public List<BsBookcaseinfo> findByAllocation(int allocation);
	
}

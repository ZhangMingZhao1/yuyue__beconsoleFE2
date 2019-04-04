package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsBookcellinfo;

public interface BsBookcellinfoDAO extends JpaRepository<BsBookcellinfo, Integer> {

	List<BsBookcellinfo> findByRepair(int repair);
	
}

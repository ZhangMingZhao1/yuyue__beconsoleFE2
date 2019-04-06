package com.yuyue.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.RsVipplanorder;

public interface RsVipplanorderDAO extends JpaRepository<RsVipplanorder, String> {

	public Page<RsVipplanorder> findByStatus(byte status, Pageable pageable);
	
}

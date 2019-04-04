package com.yuyue.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsPublishinfo;

public interface BsPublishinfoDAO extends JpaRepository<BsPublishinfo, Integer> {
	public Page<BsPublishinfo> findByPubNameLike(String pubName, Pageable pageable);
}

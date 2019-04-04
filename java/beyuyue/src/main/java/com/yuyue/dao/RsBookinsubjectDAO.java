package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BsBooksubject;
import com.yuyue.pojo.RsBookinsubject;

public interface RsBookinsubjectDAO extends JpaRepository<RsBookinsubject, Integer> {
	
	public List<RsBookinsubject> findByBsBooksubject(BsBooksubject bsBooksubject);

}

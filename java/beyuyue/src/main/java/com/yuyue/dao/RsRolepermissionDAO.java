package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BeRole;
import com.yuyue.pojo.RsRolepermission;

public interface RsRolepermissionDAO extends JpaRepository<RsRolepermission, Integer> {

	List<RsRolepermission> findByBeRole(BeRole beRole);
	
}
